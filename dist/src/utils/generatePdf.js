"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pdf_creator_node_1 = __importDefault(require("pdf-creator-node"));
const months_1 = __importDefault(require("./months"));
const data_json_1 = __importDefault(require("../../data.json"));
const buildPaths = {
    buildPathHtml: path_1.default.resolve("./build.html"),
    buildPathPdf: path_1.default.resolve("./build.pdf"),
};
const createRow = (item) => `
  <tr>
    <td>${item._id}</td>
    <td>${item.description}</td>
    <td>${item.state}</td>
    <td>${months_1.default[item.month - 1]}</td>
  </tr>
`;
const createTable = (rows) => `
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
const createHtml = (table) => `
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
const doesFileExist = (filePath) => {
    try {
        fs_1.default.statSync(filePath);
        return true;
    }
    catch (error) {
        return false;
    }
};
try {
    if (doesFileExist(buildPaths.buildPathHtml)) {
        fs_1.default.unlinkSync(buildPaths.buildPathHtml);
    }
    const rows = data_json_1.default.map(createRow).join("");
    const table = createTable(rows);
    const html = createHtml(table);
    fs_1.default.writeFileSync(buildPaths.buildPathHtml, html);
}
catch (error) {
    console.log("Error generating table", error);
}
const html = fs_1.default.readFileSync("build.html", "utf8");
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
            2: "Second page",
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
            last: "Last Page",
        },
    },
};
const document = {
    html: html,
    data: {
        data: data_json_1.default,
    },
    path: "./lastMonthReport.pdf",
};
function exportToPdf() {
    pdf_creator_node_1.default
        .create(document, options)
        .then((_) => { })
        .catch((error) => {
        console.error(error);
    });
}
exports.default = exportToPdf;
//# sourceMappingURL=generatePdf.js.map