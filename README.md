# Where It Went

An interactive spending visualizer. Import a CSV export from your bank or credit card and see how much money went where.

**Open `index.html` in a browser** — no install or build step. Your data never leaves your browser.

## What it shows

- **Summary**: total spent, monthly average, biggest category, largest purchase.
- **Treemap**: every box is sized by dollars spent, grouped by category. Click a category to zoom in on its merchants; click a merchant to filter everything to it.
- **Top merchants**: the ten places you spent the most.
- **Month by month**: stacked columns by category with the monthly average. Click a month to focus on it.
- **Transactions**: searchable, sortable list. Change a merchant's category and all of its transactions move with it.

Filter by date range (presets or From/To months) and toggle categories on or off with the chips.

## Importing your data

1. Download a CSV of transactions from your bank or card site (most have "Download" or "Export" on the activity page).
2. Click **Import CSV** (or drag the file onto the page).
3. Check the column matching: Date, Description, Amount (or a Debit column), and optionally Category. Pick whether spending appears as negative or positive numbers — it's auto-detected.
4. Tick "Add to the data already loaded" to combine several accounts. Duplicate rows are skipped.

Refunds, income and card payments/transfers are left out. Categories are guessed from merchant names (or taken from your file's Category column); fix any in the table. Your imported data and category changes are saved in your browser's local storage. **Clear data** wipes them.
