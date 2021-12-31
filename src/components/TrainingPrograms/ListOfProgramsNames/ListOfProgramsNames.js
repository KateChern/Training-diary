import classes from './ListOfProgramsNames.module.css';
import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import ProgramsContext from '../../../store/programsStore/programs-context';


const ListOfProgramsNames = (props) => {
    const programsCtx = useContext(ProgramsContext);
    const programs = programsCtx.allPrograms;
    const isLoading = programsCtx.loading;
    const error = programsCtx.error;

    const programList = programs.map(program => 
        <Link 
            key = {program.programName}  
            to={`/ProgramsList/${program.programName}`} >
            <p className={classes.trainingName}>{program.programName}</p>
        </Link>
        )

    let content = <p>Found no programs.</p>;

    if(programs.length > 0) {
        content = programList
    }
    if(error) {
        content = <p>{error}</p>; 
    }
    if(isLoading) {
        content = <p>Loading...</p>
    }
    return (
            <Fragment>
              {content} 
            </Fragment>
    )

}

export default ListOfProgramsNames ; 