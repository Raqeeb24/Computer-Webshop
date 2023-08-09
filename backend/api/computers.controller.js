import ComputersDAO from "../dao/computersDAO.js"

export default class ComputersController {
  static async apiGetComputers(req, res, next) {
    const computersPerPage = req.query.computersPerPage ? parseInt(req.query.computersPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cpu) {
      filters.cpu = req.query.cpu
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { computersList, totalNumComputers } = await ComputersDAO.getComputers({
      filters,
      page,
      computersPerPage,
    })

    let response = {
      computers: computersList,
      page: page,
      filters: filters,
      entries_per_page: computersPerPage,
      total_results: totalNumComputers,
    }
    res.json(response)
  }
  static async apiGetComputerById(req, res, next) {
    try {
      let id = req.params.id || {}
      let computer = await ComputersDAO.getComputerByID(id)
      if (!computer) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(computer)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetComputerByCpu(req, res, next) {
    try {
      let cpu = await ComputersDAO.getComputerByCpu()
      console.log(`output cpu: ${cpu}`)
      res.json(cpu)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}