const { BooleanJava, BooleanUI, BooleanDotNet, BooleanNodejs, BooleanPython, BooleanFullStack } = require("../utils/BooleanGenerator");

const getBoolean = (req, res) => {

    const { role, skills } = req.body;
    let data;


    try {
        
        if(role === "Java Developer"){
            data = BooleanJava(skills);
        }

        if(role === "UI Developer"){
            data = BooleanUI(skills);
        }

        if(role === "FullStack Developer"){
            data = BooleanFullStack(skills);
        }

        if(role === "Python Developer"){
            data = BooleanPython(skills);
        }

        if(role === "DotNet Developer"){
            data = BooleanDotNet(skills);
        }

        if(role === "Node Developer"){
            data = BooleanNodejs(skills);
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getBoolean }