# Point of Sale Server

This repo holds the source code for point of sale client application (which is in the another repo), it interacts with multi tenant databases to serve the client pos requests. it will be hosted in pos.api.domain.com subdomain in production(subject to change).

## Notes

1. Mongoose type definition is modified - and it is present under 'src/typings/mongoose.d.ts' - custom types for Model schema intellisence added.
