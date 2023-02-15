const https = require("https");
const fs = require("fs");

const API_URL = "https://955u06d6fa.execute-api.eu-west-1.amazonaws.com/latest/%5B%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%201%2C%0A%20%20%20%20%22title%22%3A%20%22madam%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%202%2C%0A%20%20%20%20%22title%22%3A%20%22noon%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%203%2C%0A%20%20%20%20%22title%22%3A%20%22wow%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%204%2C%0A%20%20%20%20%22title%22%3A%20%22kayak%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%205%2C%0A%20%20%20%20%22title%22%3A%20%22rotator%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%206%2C%0A%20%20%20%20%22title%22%3A%20%22repaper%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%207%2C%0A%20%20%20%20%22title%22%3A%20%22deed%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%208%2C%0A%20%20%20%20%22title%22%3A%20%22peep%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%209%2C%0A%20%20%20%20%22title%22%3A%20%22deified%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%2010%2C%0A%20%20%20%20%22title%22%3A%20%22racecar%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%2011%2C%0A%20%20%20%20%22title%22%3A%20%22nun%22%0A%20%20%7D%2C%0A%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%2012%2C%0A%20%20%20%20%22title%22%3A%20%22alula%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%2013%2C%0A%20%20%20%20%22title%22%3A%20%22civic%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%2014%2C%0A%20%20%20%20%22title%22%3A%20%22hannah%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22id%22%3A%2015%2C%0A%20%20%20%20%22title%22%3A%20%22arara%22%0A%20%20%7D%0A%5D%0A%0A";

https.get(API_URL, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data += chunk;
  });
  response.on("end", () => {
    fs.writeFile("data.json", data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Data retrieved and saved to data.json.");
        processDataWithPython();
      }
    });
  });
});

function processDataWithPython() {
  const { spawn } = require("child_process");
  const pythonProcess = spawn("python", ["process_data.py", "data.json"]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python script output: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python script error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
  });
}

