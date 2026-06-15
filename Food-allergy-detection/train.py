import pandas as pd
import numpy as np
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AdamW
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score, accuracy_score
from tqdm import tqdm

# -----------------------------
# 1. Load dataset
# -----------------------------
# CSV format example:
# food_name,ingredients,milk,egg,peanut,tree_nut,soy,wheat,fish,shellfish,...
# cake,"flour, milk, egg, sugar",1,1,0,0,0,1,0,0,...

df = pd.read_csv("allergen_dataset.csv")

label_cols = [
    "milk", "egg", "peanut", "tree_nut", "soy", "wheat", "fish", "shellfish",
    "sesame", "mustard", "celery", "lupin", "molluscs", "sulfites",
    "gluten", "corn", "coconut", "yeast", "garlic", "onion"
]

df["text"] = df["food_name"].fillna("") + " [SEP] " + df["ingredients"].fillna("")

train_df, val_df = train_test_split(df, test_size=0.2, random_state=42)

# -----------------------------
# 2. Dataset class
# -----------------------------
class AllergenDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len=128):
        self.texts = texts.tolist()
        self.labels = labels.values.astype(np.float32)
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        encoding = self.tokenizer(
            self.texts[idx],
            truncation=True,
            padding="max_length",
            max_length=self.max_len,
            return_tensors="pt"
        )
        item = {key: val.squeeze(0) for key, val in encoding.items()}
        item["labels"] = torch.tensor(self.labels[idx], dtype=torch.float)
        return item

# -----------------------------
# 3. Tokenizer and model
# -----------------------------
model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)

train_dataset = AllergenDataset(train_df["text"], train_df[label_cols], tokenizer)
val_dataset = AllergenDataset(val_df["text"], val_df[label_cols], tokenizer)

train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=16)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = AutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=len(label_cols),
    problem_type="multi_label_classification"
)
model.to(device)

optimizer = AdamW(model.parameters(), lr=2e-5)

# -----------------------------
# 4. Training loop
# -----------------------------
def evaluate(model, loader, threshold=0.5):
    model.eval()
    all_preds = []
    all_labels = []

    with torch.no_grad():
        for batch in loader:
            input_ids = batch["input_ids"].to(device)
            attention_mask = batch["attention_mask"].to(device)
            labels = batch["labels"].to(device)

            outputs = model(input_ids=input_ids, attention_mask=attention_mask)
            probs = torch.sigmoid(outputs.logits)
            preds = (probs > threshold).int().cpu().numpy()

            all_preds.append(preds)
            all_labels.append(labels.cpu().numpy())

    all_preds = np.vstack(all_preds)
    all_labels = np.vstack(all_labels)

    micro_f1 = f1_score(all_labels, all_preds, average="micro", zero_division=0)
    macro_f1 = f1_score(all_labels, all_preds, average="macro", zero_division=0)
    subset_acc = accuracy_score(all_labels, all_preds)

    return micro_f1, macro_f1, subset_acc

epochs = 5

for epoch in range(epochs):
    model.train()
    total_loss = 0

    for batch in tqdm(train_loader, desc=f"Epoch {epoch+1}/{epochs}"):
        optimizer.zero_grad()

        input_ids = batch["input_ids"].to(device)
        attention_mask = batch["attention_mask"].to(device)
        labels = batch["labels"].to(device)

        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            labels=labels
        )

        loss = outputs.loss
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)
    micro_f1, macro_f1, subset_acc = evaluate(model, val_loader)

    print(f"\nEpoch {epoch+1}")
    print(f"Train Loss: {avg_loss:.4f}")
    print(f"Micro F1: {micro_f1:.4f}")
    print(f"Macro F1: {macro_f1:.4f}")
    print(f"Subset Accuracy: {subset_acc:.4f}")

# -----------------------------
# 5. Save model
# -----------------------------
model.save_pretrained("allergen_model")
tokenizer.save_pretrained("allergen_model")
print("Model saved to allergen_model/")