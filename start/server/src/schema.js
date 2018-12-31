const { gql } = require('apollo-server')

const typeDefs = gql`

    type Query {
        #returns an array of launches that will never be null (!)
        launches: [Launch]! 

        #The query takes an argument of (id) and retunrs a single launch
        launch(id: ID!): Launch

        # Queries for the current user
        me: User
    }

    type Mutation {
        #If false, booking trips failed -- check errors
        bookTrips(launchIds: [ID]!): TripUpdateResponse!

        #If false, cacellation failed -- check errors
        cancelTrip(launchId: ID!): TripUpdateResponse!

        login(email: String): String #login token
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }

    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id:ID!
        email: String
        type: String
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }
    ` 

module.exports = typeDefs