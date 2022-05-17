#!/usr/bin/node
/**
 * McEgiht
 */
import fetch from "node-fetch";
import process from 'process';

const API_URL = ('https://mach-eight.uc.r.appspot.com')
const newArr = [];

if (process.argv.length !== 3) {
    process.exit(0);
  }

if (isNaN(process.argv[2])) {
    console.log("Please write a integer number");
    process.exit(0);
}

/*if ( Number.isInteger(process.argv[2])) {
  console.log("ok");
}else{
    console.log("Please write a integer number 2");
    process.exit(0);
}*/
  

const x = process.argv[2];

//get data
fetch(`${API_URL}`)
    .then((response) => {
        const data = response.json();
        newArr.push(data);
        return data
    }).then((newArr) => {
        //sort array by h_in
        newArr = newArr.values.sort((a, b) => {
            const h_inA = a.h_in;
            const h_inB = b.h_in;
            if (h_inA < h_inB) {
                return -1;
            }
            if (h_inA > h_inB) {
                return 1;
            } 
            return 0;  
        });
        //console.log(newArr);

        //binary search
        function binarySearch(newArr, l, r, x){
            //console.log(l);
            //console.log(r);
            
            if (l > r) {
                if (r < 0){
                    console.log("No matches found");
                    process.exit(0);
                }
                //console.log("No matches found 2");
                process.exit(1);  
            }
           
            const m = Math.floor((l + r)/2);
            //console.log(m)
            if(newArr[m].h_in === x){
                let i = m;
               
                let len = newArr.length -1;
                
                try{
                    while(newArr[i].h_in === x && newArr[i + 1].h_in === x){
                        //count = 1;
                        
                        console.log("-", newArr[i].first_name, newArr[i].last_name, newArr[i + 1].first_name,newArr[i + 1].last_name);
                  
                        if(i >= len){
                            return "";
                        }
                        i += 2; 
                    }
                }
                catch {
                    console.log("No matches found");
                    process.exit(0);
                }
            }        
            if(newArr[m].h_in < x){
                return binarySearch(newArr, m + 1, r, x);
            }else{
                return binarySearch(newArr, l, m -1, x)
            }
        }
       console.log(binarySearch(newArr, 0, newArr.length -1, x));
    })