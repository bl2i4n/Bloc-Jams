function forEach(array, callback){
    for(var i = 0; i < array.length; i++){
        //execute callback function for each element in array
        callback(array[i]);
    }
}