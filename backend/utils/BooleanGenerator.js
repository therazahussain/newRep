const { dictionary } = require("./Ui.js");

const dictionaryObj = dictionary

const BooleanJava = (input) => {
    const result = input.split(",");
    const excludeArray = [];

    const booleanClauses = result.map((skill) => {
        skill = skill.trim();
        if (dictionaryObj[skill.toLowerCase()]) {
            const obj = dictionaryObj[skill.toLowerCase()];
            if (
                obj.primaryFamily === "SQL" ||
                obj.primaryFamily === "Cloud" ||
                obj.primaryFamily === "Docker" ||
                obj.primaryFamily === "Docker , Container" ||
                obj.primaryFamily === "BigData" ||
                obj.primaryFamily === "Devops" ||
                obj.primaryFamily === "Database" ||
                obj.primaryFamily === "stack" ||
                obj.primaryFamily === "Thread" ||
                obj.primaryFamily === "Queue" ||
                obj.primaryFamily === "Infrastructure" ||
                obj.primaryFamily === "Build Tools" ||
                obj.primaryFamily === "Version Control" ||
                obj.primaryFamily === "webservices" ||
                obj.primaryFamily === "NoSql" ||
                obj.primaryFamily === "Hadoop" ||
                obj.skillName === "Devops" ||
                obj.skillName === "BigData" ||
                obj.skillName === "Docker" ||
                obj.skillName === "SQL" ||
                obj.skillName === "NoSql" ||
                obj.skillName === "Cloud" ||
                obj.primaryFamily === "Java" ||
                obj.primaryFamily === "Java- ORM" ||
                skill === "java"
            ) {
                if (obj.synonyms.length === 0) {
                    return skill;
                } else {
                    return `(${obj.synonyms.join(" OR ")})`;
                }
            } else {
                excludeArray.push(skill);
            }
        } else {
            return skill;
        }
    });

    const includedSkills = booleanClauses.filter(Boolean).join(" AND ");

    return includedSkills;
};

const BooleanUI = (input) => {
    const result = input.split(",");
    const excludeArray = [];
    const repeatedArray = [];

    const booleanClauses = result.map((skill) => {
        skill = skill.trim();
        if (dictionaryObj[skill.toLowerCase()]) {
            const obj = dictionaryObj[skill.toLowerCase()];
            if (
                obj.primaryFamily === "JavaScript" ||
                obj.primaryFamily === "webservices" ||
                obj.primaryFamily === "User Interface" ||
                obj.primaryFamily === "HTML" ||
                obj.skillName === "JavaScript" ||
                obj.skillName === "webservices"
            ) {
                if (repeatedArray.indexOf(obj.primaryFamily) == -1) {
                    if (obj.synonyms.length === 0) {
                        return `(${skill})`;
                    } else {
                        const synonyms = obj.synonyms.map((synonym) => `(${synonym})`);
                        return `(${skill} OR ${synonyms.join(" OR ")})`;
                    }
                } else {
                    excludeArray.push(skill);
                }
            } else {
                excludeArray.push(skill);
            }
        } else {
            return `(${skill})`;
        }
    });

    const includedSkills = booleanClauses.filter(Boolean).join(" AND ");
    const output = `(“UI Developer” OR “UI Engineer” OR “Frontend Developer” OR “Frontend Engineer” OR “Front end engineer” OR “Front end developer” OR “UX Developer” OR “UX Engineer”) AND ${includedSkills}`;

    return output.toUpperCase();
};



const BooleanDotNet = (input) => {
    let text = "";
    let obj = [];
    const result = input.split(",");
    const result_copy = [...result];
    const exclude = [];
    const repeated = [];

    result.map((skill) => {
        skill = skill.trim();
        if (dictionaryObj[skill.toLowerCase()]) {
            obj = dictionaryObj[skill.toLowerCase()];
            if (
                obj.primaryFamily === "SQL" ||
                obj.primaryFamily === "Cloud" ||
                obj.primaryFamily === "Docker" ||
                obj.primaryFamily === "Docker , Container" ||
                obj.primaryFamily === "BigData" ||
                obj.primaryFamily === "Devops" ||
                obj.primaryFamily === "Database" ||
                obj.primaryFamily === "stack" ||
                obj.primaryFamily === "Thread" ||
                obj.primaryFamily === "Queue" ||
                obj.primaryFamily === "Infrastructure" ||
                obj.primaryFamily === "Build Tools" ||
                obj.primaryFamily === "Version Control" ||
                obj.primaryFamily === "webservices" ||
                obj.primaryFamily === "NoSql" ||
                obj.primaryFamily === "Hadoop" ||
                obj.skllName === "Devops" ||
                obj.skllName === "BigData" ||
                obj.skllName === "Docker" ||
                obj.skllName === "SQL" ||
                obj.skllName === "NoSql" ||
                obj.skllName === "Cloud" ||
                obj.primaryFamily === ".Net" ||
                obj.primaryFamily === ".Net- C#" ||
                obj.primaryFamily === ".Net- C#- ORM" ||
                obj.primaryFamily === "C#- ServerSide" ||
                skill === "c#" ||
                skill === ".net"
            ) {
                if (repeated.indexOf(obj.primaryFamily) === -1) {
                    const index = result_copy.indexOf(skill);
                    if (index > -1) {
                        result_copy.splice(index, 1);
                    }
                    input = result_copy.join(",");

                    if (obj.synonyms.length === 0) {
                        text += `${skill} AND `;
                    } else {
                        text += `( `;
                        obj.synonyms.map((same) => {
                            text += ` ${same} OR`;
                        });
                        let lastIndex = text.lastIndexOf(" ");
                        text = text.substring(0, lastIndex);

                        text += ` ) AND `;
                    }
                }
                repeated.push(obj.primaryFamily);
            } else {
                exclude.push(skill);
            }
        } else {
            text += `${skill} AND `;
        }
    });

    let lastIndex = text.lastIndexOf("AND");
    text = text.substring(0, lastIndex);
    return text.toUpperCase();
};


function BooleanNodejs(input) {
    let text = "";
    let obj = [];
    const result = input.split(",");
    const result_copy = [...result];
    let repeated = [];

    result.forEach((skill) => {
        skill = skill.trim();
        if (dictionaryObj[skill.toLowerCase()]) {
            obj = dictionaryObj[skill.toLowerCase()];
            if (
                obj.primaryFamily === "SQL" ||
                obj.primaryFamily === "Cloud" ||
                obj.primaryFamily === "Docker" ||
                obj.primaryFamily === "Docker , Container" ||
                obj.primaryFamily === "BigData" ||
                obj.primaryFamily === "Devops" ||
                obj.primaryFamily === "Database" ||
                obj.primaryFamily === "stack" ||
                obj.primaryFamily === "Thread" ||
                obj.primaryFamily === "Queue" ||
                obj.primaryFamily === "Infrastructure" ||
                obj.primaryFamily === "Build Tools" ||
                obj.primaryFamily === "Version Control" ||
                obj.primaryFamily === "webservices" ||
                obj.primaryFamily === "Hadoop" ||
                obj.primaryFamily === "Nodejs" ||
                obj.primaryFamily === "ExpressJS" ||
                obj.skillName === "NodeJs" ||
                obj.skillName === "ExpressJs" ||
                obj.skillName === "MongoDB"
            ) {
                if (repeated.indexOf(obj.primaryFamily) === -1) {
                    const index = result_copy.indexOf(skill);
                    if (index > -1) {
                        result_copy.splice(index, 1);
                    }
                    input.response = result_copy.toString();

                    if (obj.synonyms.length === 0) {
                        text += `${skill} AND `;
                    } else {
                        text += "( ";
                        obj.synonyms.forEach((same) => {
                            text += ` ${same} OR`;
                        });
                        let lastIndex = text.lastIndexOf(" ");
                        text = text.substring(0, lastIndex);

                        text += " ) AND ";
                    }
                }
                repeated.push(obj.primaryFamily);
            } else {
                text += `${skill} AND `;
            }
        } else {
            text += `${skill} AND `;
        }
    });

    let lastIndex = text.lastIndexOf("AND");
    text = text.substring(0, lastIndex);
    return text.toUpperCase();
}


function BooleanPython(input) {
    var text = "";
    let obj = [];
    var result = input.split(",");
    var result_copy = result.slice();
    var exclude = [];
    let repeated = [];
    result.forEach((skill) => {
        skill = skill.trim();
        if (dictionaryObj[skill.toLowerCase()]) {
            obj = dictionaryObj[skill.toLowerCase()];
            if (
                obj.primaryFamily === "SQL" ||
                obj.primaryFamily === "Cloud" ||
                obj.primaryFamily === "Docker" ||
                obj.primaryFamily === "Docker , Container" ||
                obj.primaryFamily === "BigData" ||
                obj.primaryFamily === "Devops" ||
                obj.primaryFamily === "Database" ||
                obj.primaryFamily === "stack" ||
                obj.primaryFamily === "Thread" ||
                obj.primaryFamily === "Queue" ||
                obj.primaryFamily === "Infrastructure" ||
                obj.primaryFamily === "Build Tools" ||
                obj.primaryFamily === "Version Control" ||
                obj.primaryFamily === "webservices" ||
                obj.primaryFamily === "NoSql" ||
                obj.primaryFamily === "Hadoop" || 
                obj.skllName === "Devops" ||
                obj.skllName === "BigData" ||
                obj.skllName === "Docker" ||
                obj.skllName === "SQL" ||
                obj.skllName === "NoSql" ||
                obj.skllName === "Cloud" ||
                obj.primaryFamily === "Python" ||
                obj.skillName === "Python"
            ) {
                if (repeated.indexOf(obj.primaryFamily) == -1) {
                    const index = result_copy.indexOf(skill);
                    if (index > -1) {
                        result_copy.splice(index, 1);
                    }
                    input = result_copy.toString();

                    if (obj.synonyms.length == 0) {
                        text += skill + " AND ";
                    } else {
                        text += "( ";
                        Object.values(obj.synonyms).forEach((same) => {
                            text += " ";
                            text += same + " OR";
                        });
                        var lastIndex = text.lastIndexOf(" ");
                        text = text.substring(0, lastIndex);

                        text += " ) AND ";
                    }
                }
                repeated.push(obj.primaryFamily);
            } else {
                exclude.push(skill);
            }
        } else {
            text += skill + " AND ";
        }
    });
    var lastIndex = text.lastIndexOf("AND");
    text = text.substring(0, lastIndex);
    return text.toUpperCase();
}


function BooleanFullStack(input) {
    var text = "";
    let obj = [];
    var result = input.split(",");
    var result_copy = result;
    var exclude = [];
    let repeated = [];
    result.map((skill) => {
      skill = skill.trim();
      if (dictionaryObj[skill.toLowerCase()]) {
        obj = dictionaryObj[skill.toLowerCase()];
        if (obj.primaryFamily !== "OS") {
          if (repeated.indexOf(obj.primaryFamily) == -1) {
            const index = result_copy.indexOf(skill);
            if (index > -1) {
              result_copy.splice(index, 1);
            }
            input = result_copy.toString();
  
            // console.log("thisthisthisthisthisthis", obj);
            //console.log(obj.synonyms.length);
            if (obj.synonyms.length == 0) {
              text += skill + " AND ";
              //console.log(text);
            } else {
              text += "( ";
              // text += skill + " OR ";
              Object.values(obj.synonyms).map((same) => {
                text += " ";
                text += same + " OR";
              });
              var lastIndex = text.lastIndexOf(" ");
              text = text.substring(0, lastIndex);
  
              text += " ) AND ";
            }
          }
          repeated.push(obj.primaryFamily);
        } else {
          exclude.push(skill);
          response.setState({ excluded: exclude });
        }
      } else {
        text += skill + " AND ";
      }
    });
    var lastIndex = text.lastIndexOf("AND");
    text = text.substring(0, lastIndex);
    return text.toUpperCase();
  }
  



module.exports = { BooleanJava, BooleanUI, BooleanDotNet, BooleanNodejs, BooleanPython, BooleanFullStack }