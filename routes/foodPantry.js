function factory(logger, foodPantryService) {
  GET.apiDoc = {
    summary: "Get list of records",
    tags: ["Food Pantries"],
    produces: ["application/json"],
    parameters: [],
    responses: {
      200: {
        description: "List of Food Pantry records"
      },
      500: {
        description: "Internal Server Error"
      }
    }
  };

  POST.apiDoc = {
    summary: "Create record",
    tags: ["Food Pantries"],
    produces: ["application/json"],
    parameters: [
      {
        description: "Record attributes",
        in: "body",
        name: "foodPantry",
        required: true,
        schema: {
          properties: {
            location_name: {
              description: "Food Pantry Name",
              type: "string"
            },
            street_address_1: {
              description: "Street Address Line 1",
              type: ["string", "null"]
            },
            street_address_2: {
              description: "Street Address Line 2",
              type: ["string", "null"]
            },
            city: {
              description: "City",
              type: ["string", "null"]
            },
            state: {
              description: "State",
              type: "string"
            },
            zip: {
              description: "ZIP Code",
              type: ["string", "null"]
            },
            hours_of_operation: {
              description: "Hours of Operation",
              type: ["string", "null"]
            },
            website: {
              description: "Food Pantry URL",
              type: ["string", "null"]
            },
            phone: {
              description: "Food Pantry Phone Number",
              type: ["string", "null"]
            },
            areas_served: {
              description: "Areas Served",
              type: ["string", "null"]
            },
            longitude: {
              description: "longitude",
              type: "number"
            },
            latitude: {
              description: "latitude",
              type: "number"
            }
          },
          required: ["location_name", "latitude", "longitude"],
          type: "object"
        }
      }
    ],
    responses: {
      200: {
        description: "Successfully created a new record"
      },
      400: {
        description: "Bad Request"
      },
      500: {
        description: "Internal Server Error"
      },
      default: {
        description: "An error occured"
      }
    }
  };

  return {
    GET,
    POST
  };

  async function GET(req, res) {
    let result;
    try {
      result = await foodPantryService.list();
    } catch (e) {
      logger.error(e);
      return res.status(500).json({ message: "Server Error" });
    }
    return res.status(200).json(result);
  }

  async function POST(req, res) {
    const { body: params } = req;
    let result;
    if (Object.keys(params).length < 1) {
      return res
        .status(400)
        .json({ message: "Must include at least one attribute" });
    }
    try {
      const { gid } = await foodPantryService.create(params);
      result = await foodPantryService.get(gid);
    } catch (e) {
      logger.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ result });
  }
}

module.exports = factory;
