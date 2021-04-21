export const formatString = (str, wordsNumber)=> { //used to format lyrics to fit a number of words into lines
    var peices = [];
    if(str){

    const words = str?.split(" ");
    for(var i = 0 ; i < str.length+wordsNumber; i += wordsNumber) {
       peices.push(words.slice(i,(i+wordsNumber)).join(" "))
    }
    }
    return peices
};