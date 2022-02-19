#!/usr/bin/env node
let fs=require('fs');
let path=require('path');

let inputArr=process.argv.slice(2);
if(inputArr.length==0)
{
    console.log("Please enter a Path");
    return;
}
if(inputArr.length==1)         // display file
{
    let pathOfFile=path.join(process.cwd(),inputArr[0]);
    if(fs.existsSync(pathOfFile)==false)
    {
        console.log("file doesnt exist");
        return;
    }
    let fileData=fs.readFileSync(pathOfFile);
    console.log(fileData+"");
}
else if(inputArr[0]=='-s')     // If there are multiple line breaks then make only 1 line break
{
    let pathOfFile=path.join(process.cwd(),inputArr[1]);
    if(fs.existsSync(pathOfFile)==false)
    {
        console.log("file doesnt exist");
        return;
    }
    fileData=fs.readFileSync(pathOfFile);
    fileData+="";
    let tempData=fileData.split("\n");
    fs.writeFileSync(pathOfFile,"");
    for(let i=0;i<tempData.length-1;i++)
    {
        if(tempData[i]=="\r"&&tempData[i+1]=="\r")
        {
            continue;
        }
        else
        {
            fs.appendFileSync(pathOfFile,tempData[i]);
        }
    }
    if(tempData[tempData.length-1]!="\r")
    {
        fs.appendFileSync(pathOfFile,tempData[tempData.length-1]);
    }
    console.log(tempData);
}
else if(inputArr[0]=='-n')      // give line numbering to all lines
{
    let pathOfFile=path.join(process.cwd(),inputArr[1]);
    if(fs.existsSync(pathOfFile)==false)
    {
        console.log("file doesnt exist");
        return;
    }
    fileData=""+fs.readFileSync(pathOfFile);
    let tempData=fileData.split("\n");    // splits data line by line
    fs.writeFileSync(pathOfFile,"");       // Making file empty
    for(let i=0;i<tempData.length;i++)
    {
        if(tempData[i]=='\r')
        {
            fs.appendFileSync(pathOfFile,i+1+"\r\n");       // appending new line
        }
        else
        {
            fs.appendFileSync(pathOfFile,(i+1)+" "+tempData[i]);    // appending data + line number
        }   
    }
}
else if(inputArr[0]=='-b')      // give line numbering to only non empty lines
{
    let pathOfFile=path.join(process.cwd(),inputArr[1]);
    if(fs.existsSync(pathOfFile)==false)
    {
        console.log("file doesnt exist");
        return;
    }
    fileData=""+fs.readFileSync(pathOfFile);
    let tempData=fileData.split("\n");    // splits data line by line
    fs.writeFileSync(pathOfFile,"");    // making file empty
    let count=0;
    for(let i=0;i<tempData.length;i++)
    {
        if(tempData[i]=='\r')    // if line was empty 
        {
            fs.appendFileSync(pathOfFile,"\r\n");   //  \r\n to add a new empty line  
        }
        else
        {
            fs.appendFileSync(pathOfFile,(count+1)+" "+tempData[i]);   // adding data+ line number
            count++;
        }   
    }
}
else     // miltiple files are to be displayed 
{
    let fileData="";
    for(let i=0;i<inputArr.length;i++)
    {
        let pathOfFile=path.join(process.cwd(),inputArr[i]);
        fileData+=fs.readFileSync(pathOfFile);
        fileData+="\n";
    }
    console.log(fileData);
}
    
