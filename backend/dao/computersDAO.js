import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let computers

export default class ComputersDAO {
  static async injectDB(conn) {
    if (computers) {
      console.log("data loaded")
      return
    }
    try {
      computers = await conn.db(process.env.RESTREVIEWS_NS).collection("computers")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in computersDAO: ${e}`,
      )
    }
  }

  static async getComputers({
    filters = null,
    page = 0,
    computersPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } }
      } else if ("cpu" in filters) {
        query = { "cpu": { $eq: filters["cpu"] } }
      }
    }

    let cursor
    
    try {
      cursor = await computers.find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { computersList: [], totalNumcomputers: 0 }
    }

    const displayCursor = cursor.limit(computersPerPage).skip(computersPerPage * page)

    try {
      const computersList = await displayCursor.toArray()
      const totalNumcomputers = await computers.countDocuments(query)

      return { computersList, totalNumcomputers }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { computersList: [], totalNumcomputers: 0 }
    }
  }
  static async getComputerByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$computer_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await computers.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getComputerByID: ${e}`)
      throw e
    }
  }
  
  static async getComputerByCpu() {
    let cpu = []
    try {
      cpu = await computers.distinct("cpu")
    } catch (e) {
      console.log("unable to get cpu")
      console.error(`Unable to get cpu ${e}`)
      return cpu
    }
  }


}


