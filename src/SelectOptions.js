import React from 'react'

export default function SelectOptions({persons}) {
    return (
        persons.map(person => {
            return <option key={person.id} value={person.name}>{person.name}</option>
        })
    )
}
