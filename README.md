# Carbon APIs

## Icon Schema

| Field name | Type      | Required |
|------------|-----------|----------|
| name       | String    | true     |
| width      | Number    | true     |
| height     | Number    | true     |
| viewBox    | String    | true     |
| paths      | String [] | true     |
| tags       | String [] |          |
| url        | String    |          |
| svgString  | String    |          |
| _id        | ObjectId  |          |
| __v        | Number    |          |

## Icon API Routes

| Method | Path              | Query                                                   | Description           | Cors |
|--------|-------------------|---------------------------------------------------------|-----------------------|------|
| GET    | `/icons`          | `?name=ICON_NAME`: return single icon by name           | Return all icons      | true |
| GET    | `/icons/:icon_id` |                                                         | Return one icon by id | true |
| POST   | `/icons`          |                                                         | Add a new icon        |      |
| PATCH  | `/icons/:icon_id` | `?tags=add`: update tags array with new + existing tags | Update one icon by id |      |


