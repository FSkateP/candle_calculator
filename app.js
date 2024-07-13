const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
  const { waxGrams, scentMl, pouringTemp } = req.body;
  
  // Simple calculation logic (replace with your actual logic)
  const totalIngredients = waxGrams + scentMl;

  res.json({
    totalIngredients,
    pouringTemp
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});