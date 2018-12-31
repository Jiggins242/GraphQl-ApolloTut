const { RESTDataSource } = require('apollo-datasource-rest')

class LaunchAPI extends RESTDataSource {
    constructor(){
        super()
        this.baseURL = 'https://api.spacexdata.com/v2/'
    }


    launchReducer(launch) {
        return {
            id: launch.flight_number || 0,
            cursor: `${launch.launch_date_unix}`,
            site: launch.launch_site && launch.launch_site.site_name,
            mission: {
                name: launch.mission.name,
                missionPatchSmall: launch.links.mission_patch_small,
                missionPatchLarge: launch.links.mission_patch,
            },
            rocket: {
                id: launch.rocket.rocket_id,
                name: launch.rocket.rocket_name,
                type: launch.rocket.rocket_type
            }
        }
    }

    async getAllLaunches() {
        // Makes a GET request to:https://api.spacexdata.com/v2/launches
        const res = await this.get('launches')
        // Returns the launch in trhe res variable
        // The getAllLaunches method maps over the launches and transforms the response from our REST endpoint with this.launchReducer
        // If there are no launches, an empty array is returned.
        return res && res.length ? res.map(l => this.launchReducer(l)) : []
    }

    // getLaunchById method takes in a flight number and returns the data for a particular launch
    async getLaunchById({ launchId }) {
        const res = await this.get('launches', { flight_number: launchId })
        return this.launchReducer(res[0]);
    }

    // getLaunchesByIds returns several launches based on their respective launchIds
    async getLaunchByIds({ launchId }) {
        return Promise.all(
            launchId.map(launchId => this.getLaunchById({ launchId }))
        )
    }
}

module.exports = LaunchAPI