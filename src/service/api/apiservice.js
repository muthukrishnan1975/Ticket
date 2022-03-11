import React from 'react';


//const BASE_URL = 'http://13.232.196.255/mobileapp2.0/public/application'
const BASE_URL = 'http://192.168.1.109/mobileapp2.0/public/application'
// LoginScreen

export const LoginRequest = async (bodydata) => {
    try {
        const response = await fetch(`${BASE_URL}/commonio/checkuserdetailsweb`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response)
        return response;
    } catch (e) {
        console.log(e)
    }

}

// RegisterSceen

export const RegisterRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/commonio/getappinfo`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response)
        return response;
    } catch (e) {
        console.log(e)
    }
}

//DashboardScreen 
export const MaintentanceSchedule = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/assetticket/schedulemaintenance`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}
export const TicketEntry = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/assetticket/ticketentry`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}
export const AssetList = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/assetticket/assetlist`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}