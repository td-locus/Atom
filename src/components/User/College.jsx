import React from 'react';
import moment from 'moment';

import { Card, CardBody } from "reactstrap";

import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';

function College({ user }) {
    return (
        <div className='college-box pt-2'>
            <Card style={{ position: "relative" }} className="p-3">
                <CardBody>
                    <h4 className='title'>College Details</h4>
                    <div className='college-details mt-3'>
                        <p>
                            <LocationCityIcon /> {user?.college?.name}
                        </p>
                        <p>
                            <LocationOnIcon /> {user?.college?.location}
                        </p>
                        <p>
                            <SchoolIcon /> {moment(user?.college?.graduationYear).format("MMMM YYYY")}
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default College;
