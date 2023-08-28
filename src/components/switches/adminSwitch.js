import { getSessionToken } from '@descope/react-sdk';
import React, { useState } from 'react';
import Switch from 'react-switch';


export default function AdminSwitch() {

    const [checked, setChecked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const projectId = localStorage.getItem('projectId') || process.env.REACT_APP_DESCOPE_PROJECT_ID;
    const sessionToken = getSessionToken();

    const handleChange = async (checked) => {
        console.log("Toggle");
        setIsLoading(true);
        const apiRoute = checked ? "/api/addRoles" : "/api/removeRoles";
        await fetch(apiRoute, {
            method: "get",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "x-project-id": projectId,
                Authorization: `Bearer ${sessionToken}`,
            },
        })
            .then((response) => {
                if (response.status === 401) {
                } else {
                    return response.json();
                }
            })
            .catch((err) => console.log('err => ', err));
        if (checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
        setIsLoading(false);
    }

    return (
        <label>
            <div style={{ marginBottom: "5px" }}>
                <h4>{checked ? <>Is Admin</> : <>Not Admin</>}</h4>
                <p style={{ maxWidth: "150px", fontSize: "12px" }}>
                    Click the switch to toggle whether the "Tenant Admin"
                    role is assigned to your account.
                </p>
            </div>
            <Switch onChange={handleChange} checked={checked} />
        </label>
    );

}