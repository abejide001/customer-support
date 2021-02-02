import path from "path";
import fs from "fs";
import pdf from "pdf-creator-node";
import months from "./months";
import data from "../../data.json";

const buildPaths = {
  buildPathHtml: path.resolve("./build.html"),
  buildPathPdf: path.resolve("./build.pdf"),
};

/**
 * Take an object which has the following model
 * @param {Object} item
 * @model
 * {
 *   "Id": `Number`,
 *   "month": `Number`,
 *   "state": `String`,
 *   "description": `String`,
 * }
 *
 * @returns {String}
 */
const createRow = (item: any) => `
  <tr>
    <td>${item._id}</td>
    <td>${item.description}</td>
    <td>${item.state}</td>
    <td>${months[item.month - 1]}</td>
  </tr>
`;

/**
 * @description Generates an `html` table with all the table rows
 * @param {String} rows
 * @returns {String}
 */
const createTable = (rows: any) => `
  <table>
    <tr>
        <th>Id</td>
        <th>Description</td>
        <th>State</td>
        <th>Month</td>
    </tr>
    ${rows}
  </table>
`;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (table: any) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
      ${table}
    </body>
  </html>
`;

/**
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath
 * @returns {Boolean}
 */
const doesFileExist = (filePath: any) => {
  try {
    fs.statSync(filePath); // get information of the specified file path.
    return true;
  } catch (error) {
    return false;
  }
};

try {
  /* Check if the file for `html` build exists in system or not */
  if (doesFileExist(buildPaths.buildPathHtml)) {
    /* If the file exists delete the file from system */
    fs.unlinkSync(buildPaths.buildPathHtml);
  }
  /* generate rows */
  const rows = data.map(createRow).join("");
  /* generate table */
  const table = createTable(rows);
  /* generate html */
  const html = createHtml(table);
  /* write the generated html to file */
  fs.writeFileSync(buildPaths.buildPathHtml, html);
} catch (error) {
  console.log("Error generating table", error);
}

const html = fs.readFileSync("build.html", "utf8");

const options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Author: Femi Abejide</div>',
  },
  footer: {
    height: "28mm",
    contents: {
      first: "First Page",
      2: "Second page", // Any page number is working. 1-based index
      default:
        '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: "Last Page",
    },
  },
};
const document = {
  html: html,
  data: {
    data,
  },
  path: "./lastMonthReport.pdf",
};

export default function exportToPdf() {
  pdf
  .create(document, options)
  .then((_: any) => {})
  .catch((error: Error) => {
    console.error(error);
  });
}

