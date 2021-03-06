let table = "bike_path_pdx";

function factory({ pg }) {
  return {
    getGeoJSON
  };

  async function getGeoJSON() {
    // prettier-ignore
    const query =
  `SELECT row_to_json(fc)
  from (
      SELECT
          'FeatureCollection' as "type",
          array_to_json(array_agg(f)) as "features"
      FROM (
          SELECT
              'Feature' as "type",
              ST_AsGeoJSON(ST_Transform(geom, 4326), 6) :: json as "geometry",
              (
                  SELECT json_strip_nulls(row_to_json(t))
                  FROM (
                      SELECT
                      gid,
                      tranplanid,
                      segmentnam,
                      status,
                      facility,
                      yearbuilt,
                      shape_leng,
                      yearretire,
                      scs,
                      lengthmile
                        ) t
              ) as "properties"
          FROM ${table} WHERE status='Recommended'
      ) as f
  ) as fc;
    `;

    const result = await pg.query(query);
    return result[0]["row_to_json"];
  }
}

module.exports = factory;
