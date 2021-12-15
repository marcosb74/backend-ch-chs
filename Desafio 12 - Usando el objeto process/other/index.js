const calcular = (repetitions) => {
  let total = [];
  for (let i = 0; i < repetitions; i++) {
    total[i] = Math.random() * (1001 - 1) + 1;
  }
  return total;
};

process.on("message", (message) => {
  console.log(message);
  if (typeof message == "number") {
    let total = calcular(message);
    process.send(total);
  } else {
    console.log("The process could not start.");
  }
});
