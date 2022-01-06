const autocannon = require("autocannon");

const { passThrough } = require("stream");

const run = (url) => {
  const buff = [];
  const outputStream = new passThrough();

  const inst = autocannon({
    url,
    connections: 100,
    duration: 20,
  });

  autocannon.track(inst, { outputStream });

  outputStream.on("data", (data) => {
    buff.push(data);
  });

  inst.on("done", () => {
    process.stdout.write(Buffer.concat(buff));
  });
};

run("http://localhost:4000/info");
