export const dataMolecules = [
    {
        title: "Water",
        formula: "H20",
        text: "The main menu should have the name of the app, on top (ChemDojo) and below there should be a list of buttons the user can click on which will direct them to different subpages. Each subpage should have a ‘back to main menu/home’ button so the user can go back when desired.Play - directs the user to a page showing the levels of the game and is where they will be able to select the level they would like to play",
        density: "High",
        state: "liquid",
        src: require("../assets/water.png"),
        color: "bg-cyan-50"
    },
    {
        title: "Laughing gas",
        formula: "N20",
        text: "N20",
        density: "low",
        state: "gas",
        src: require("../assets/chemdojo2.jpg"),
        color: "bg-green-50"
    },
    {
        title: "Bromine",
        formula: "Br",
        text: "H20",
        density: "low",
        state: "liquid",
        src: require("../assets/chemdojo3.jpg"),
        color: "bg-orange-50"
    },
    {
        title: "Potash",
        formula: "NaOH",
        text: "NaOH",
        density: "medium",
        state: "solid",
        src: require("../assets/bg1.jpg"),
        color: "bg-yellow-50"
    },
    {
        title: "Ethanoic acid",
        formula: "CH3COOH",
        text: "NaOH",
        density: "medium",
        state: "solid",
        src: require("../assets/bg2.jpeg"),
        color: "bg-indigo-50"
    },
    
]

export const Topics = [
{
    name: "Alkanes",
    color: "bg-indigo-500",
    src: require("../assets/alkanes.png")
},
{
    name: "Alkenes",
    color: "bg-blue-500",
    src: require("../assets/alkenes.png")
},
{
    name: "Alkynes",
    color: "bg-red-500",
    src: require("../assets/alkynes.png")
}
]

export const Alkanes = [
{
    level: [
    {
        question: "What are hydrocarbons ?",
        alternatives: ["compounds containing C and H","compounds containing C and O","compounds containing H and O","compounds with N and O"],
        answer:  "A"
    },
    {
        question: "What is the general form of alkanes",
        alternatives: ["CnH2n","CnH2n+1","CnH2n+2","CnH2n-2"],
        answer:  "C"
    },
    {
        question: "What forces exist in CH4 atoms",
        alternatives: ["Van der waals","lone pair lone pair","H bonds","Methane bonds"],
        answer:  "A"
    },
    {
        question: "Which of these is a halogenoalkane",
        alternatives: ["CH4","C2H5","CH3","CH3Cl"],
        answer:  "D"
    },
    {
        question: "Which of these is an alkane",
        alternatives: ["CH5","CH6","C2H6","C2H3"],
        answer:  "C"
    },
    ],
  color: "bg-green-50"
},
{
level: 
    [

    ],
color: "bg-red-50"
}
]