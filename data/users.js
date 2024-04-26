const users = [
    {
        "id": 1,
        "username": "Karl",
        "password": "1234",
        "habits": {
            "count": 2,
            "content" : [
                {
                    "id": 1,
                    "name": "Gaming",
                    "progress": 10,
                },
                {
                    "id": 2,
                    "name": "Schlafen",
                    "progress": 120,
                },
        ]
            
        },
        "goals": {
            "count": 1,
            "content" : [
                {
                    "id": 1,
                    "name": "No Smoking",
                    "progress": 10,
                    "goal": 20,
                }
            ]
            
        }
    },
    {
        "id": 2,
        "username": "Achim",
        "password" : "12345",
        "habits": {
            "count": 1,
            "content" : [
                {
                    "id": 1,
                    "name": "Schule",
                    "progress": 120,
                },
        ]
            
        },
        "goals": {
            "count": 1,
            "content" : [
                {
                    "id": 1,
                    "name": "No Smoking",
                    "progress": 120,
                    "goal": 220,
                }
            ]
        }
    }
]

export default users