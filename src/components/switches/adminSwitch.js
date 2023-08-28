import React, { useState } from 'react';
import Switch from 'react-switch';


export default function AdminSwitch() {

    const [checked, setChecked] = useState(null);

    const handleChange = (checked) => {
        if (checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }

    return (
        <label>
            <div style={{ marginBottom: "5px" }}>
                <h4>{checked ? <>Is Admin</> : <>Not Admin</>}</h4>
                <p style={{ maxWidth: "150px", fontSize: "12px" }}>
                    Toggle the switch to toggle whether the "Tenant Admin"
                    role is assigned to your account.
                </p>
            </div>
            <Switch onChange={handleChange} checked={checked} />
        </label>
    );

}