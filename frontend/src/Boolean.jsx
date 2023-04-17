import { useState, useEffect } from 'react';
import dictionary from './Ui';

import React from 'react'

const Bollean = () => {

  let dictionaryObj = dictionary;
  const [text, setText] = useState("");
  const [inputValues, setInputValues] = useState("");


  // this is working as a send button
  const handleClick = async () => {
    const data = await BooleanJava(inputValues);
    console.log(data)
  }


  // this is text field to take the skills as input
  const handleChange = (event) => {
    setInputValues(event.target.value)
  }

  // Boolean Generator for Java Developers
  const BooleanJava = async (input) => {
    const result = input.split(",");
    const excludeArray = [];
    const repeatedArray = [];
  
    const promises = result.map(async (skill) => {
      skill = skill.trim();
      if (dictionaryObj[skill.toLowerCase()]) {
        const obj = dictionaryObj[skill.toLowerCase()];
        console.log(obj)
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
            return skill + " AND ";
          } else {
            let newText = "( ";
            obj.synonyms.forEach((same) => {
              newText += " " + same + " OR";
            });
            const lastIndex = newText.lastIndexOf(" ");
            newText = newText.substring(0, lastIndex);
  
            newText += " ) AND ";
            return newText;
          }
          repeatedArray.push(obj.primaryFamily);
        } else {
          excludeArray.push(skill);
        }
      } else {
        return skill + " AND ";
      }
    });
  
    const resolvedPromises = await Promise.all(promises);
  
    // const finalText = resolvedPromises.join("").toUpperCase();
    const finalText = resolvedPromises.join("").toUpperCase().replace(/\s+AND\s*$/, '');
  
    return finalText;
  };
  

  return (
    <>
      <input type="text" value={inputValues} onChange={handleChange}/>
      <button onClick={handleClick}>Submit</button>
      {text}
    </>
  )
}

export default Bollean
