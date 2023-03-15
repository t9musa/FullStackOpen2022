
const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.map(element => {
        return element.likes
    }).reduce((acc, curr) => acc + curr,
    0
  ) 
}

const returnMostLikedBlog = (blogs) => {

  return blogs.find(element => {
    return element.likes === Math.max.apply(null, blogs.map(element => {
      return element.likes
      }))
  }
)
   
}
  
  module.exports = {
    dummy, totalLikes, returnMostLikedBlog
  }