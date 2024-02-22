import './TrackMovements.css'
import Card from 'react-bootstrap/Card';

const TrackMovements = ({text, horizontal, vertical}) => {
    //! POR ENQUANTO NÃO VOU FAZER FUNCIONALIDADE
    // por enquanto o foco é fazer algo pra olhar

    let txt = `${horizontal[text[0]]}${vertical[text[0] - 1]}`

    return (
        <Card key="movement_tracking" text="light" className="track-movements">
            <Card.Header>Movimentos</Card.Header>
            <Card.Body>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default TrackMovements; 