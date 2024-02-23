import './TrackMovements.css'
import Card from 'react-bootstrap/Card';
import Moves from './move/moves.js';

const TrackMovements = ({text, horizontal, vertical}) => {
    //! POR ENQUANTO NÃO VOU FAZER FUNCIONALIDADE
    // por enquanto o foco é fazer algo pra olhar


    return (
        <Card key="movement_tracking" text="light" className="track-movements">
            <Card.Header className="text-center">Movimentos</Card.Header>
            <Card.Body className="p-0 m-0">
                <Moves text={text} />
            </Card.Body>
        </Card>
    )
}

export default TrackMovements; 