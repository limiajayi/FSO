import Number from "./Number"

const Persons = ({ personsToShow, deletePerson }) => {

    return (
        <div>
            {personsToShow.map((person) => {
            return (
                <Number 
                key={person.id} 
                person={person} 
                deletePerson={() => deletePerson(person.id, person.name)}
                />
            )
            })}
        </div>
    )

}

export default Persons