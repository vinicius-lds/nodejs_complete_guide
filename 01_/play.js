

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!')
        }, 2000)
    })
}


fetchData()
    .then(result => {
        console.log(result)
        return fetchData()
    })
    .then(result => {
        console.log(result)
        return fetchData()
    })
    .then(result => {
        console.log(result)
        return fetchData()
    })
    .then(result => {
        console.log(result)
        return fetchData()
    })
    .then(result => {
        console.log(result)
        return fetchData()
    })



