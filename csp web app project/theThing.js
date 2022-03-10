var form = document.getElementById("seqForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener("submit", handleForm);


function sequence(){
    let x = document.getElementById("cDNAinput").value;
    const bases = ['a', 't', 'c', 'g', 'A', 'T', 'C', 'G'];
    let valid = true;
    let pl = document.getElementById("priLength").value;
    if (typeof x === 'string'||x instanceof String){
        for (let i = 0; i < x.length; i++){
            if (!bases.includes(x.charAt(i))){
                valid = false;
            }
        }
        if (x.length < (parseInt(pl) + 10)){
            valid = false;
        }
    }
    else{
        alert("not a string");
        valid = false;
    }
    if (valid){
        showNext(x);
    }
}
const restNames = ["XhoI", "EagI", "HindIII", "SalI", "Eco53kI", "SacI", "EcoRI", "BamHI"];
const restSites = [
    ["CTCGAG",158,1],
    ["CGGCCG",166,1],
    ["AAGCTT",173,1],
    ["GTCGAC",179,1],
    ["GAGCTC",188,3],
    ["GAGCTC",190,5],
    ["GAATTC",192,1],
    ["GGATCC",198,1]
];

let divVis = document.getElementsByClassName("pairBtn");
for (let j = 0; j < divVis.length; j++){
    divVis[j].style.display="none";
}

function showNext(seq){
    let available = [1,1,1,1,1,1,1,1];
    for (let k = 0; k < restNames.length; k++){
        for (let m = 0; m < seq.length - restSites[k][0].length; m++){
            if (seq.substring(m, m+restSites[k][0].length)===restSites[k][0]){
                available[k]=0;
            }
        }
    }
    for (let j = 0; j < divVis.length; j++){
        if (available[parseInt(divVis[j].id.charAt(0))-1] === 1 && available[parseInt(divVis[j].id.charAt(2))-1] === 1){
            divVis[j].style.display = "inline-block";
        }
    }
    for(let i = 0; i < available.length; i++){
        console.log(available[i]);
    }
}


function primer(pair){
    let x = document.getElementById("cDNAinput").value;
    let fstr = restSites[parseInt(pair.charAt(0))][0];
    let rstr = restSites[parseInt(pair.charAt(2))][0];
    let fprime = "5'  " + fstr;
    let rprime = "5'  " + rstr;
    let plen = document.getElementById("priLength").value;
    for (let i = 0; i < parseInt(plen) - fstr.length; i++){
        fprime += x.charAt(i);
    }
    for (let i = x.length - 1; i >= x.length - parseInt(plen) + rstr.length; i--){
        rprime += x.charAt(i);
    }
    fprime += "  3'";
    rprime += "  3'";
    var element = document.getElementById("forw");
    element.innerHTML = "Forward Primer: " + fprime;
    var element = document.getElementById("reve");
    element.innerHTML = "Reverse Primer: " + rprime;

}
