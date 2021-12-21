import React, {useState} from 'react'
import BountyForm from './BountyForm'

export default function Bounty(props) {
    const {firstName, lastName, bountyAmount, type, _id} = props
    const [isToggle, setIsToggle] = useState(false)
    return (
        <div className='bounty'>
            { !isToggle ?

            <>
                <h1>{firstName} {lastName}</h1>
                <p>bounty: ${bountyAmount}</p>
                <p>faction: {type}</p>
                <button className='delete-btn' onClick={() => props.deleteBounty(_id)}>delete</button>
                <button className='edit-btn' onClick={() => setIsToggle(prevToggle => !prevToggle)}>edit</button>
            </>
            :
            <>
                <BountyForm firstName={firstName} lastName={lastName} bountyAmount={bountyAmount} type={type} btnText="submit edit" _id={_id} submit={props.editBounty}/>
                <button onClick={() => setIsToggle(prevToggle => !prevToggle)}>close</button>
            </>
            }
        </div>
    )
}
