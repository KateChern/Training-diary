import { useReducer, useState, useEffect, useCallback } from "react";
import ProgramsContext from "./programs-context";
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs } from 'firebase/firestore/lite';
import db from "../../firebase";

const defaultProgramState = {
    allPrograms: [],
    exercises: [],
    error: null,
    loading: true
}

const programReducer = (state, action) => {
    if (action.type === 'ADD') {      
        let updatedItems = state.exercises.concat(action.payload);
        return {
            exercises: updatedItems,
            allPrograms: [],
            error: null,
            loading: false
        }
    } 
   
    if(action.type === 'FETCH_START') {
        return {
            loading: true,
            error: null,
            allPrograms: [],
            exercises: [],
        }
    }
    if(action.type === 'FETCH_SUCCESS') {
        return {
            loading: false,
            error: null,
            allPrograms: action.payload,
            exercises: [],
        }
    }
    if(action.type === 'FETCH_ERROR') {
        return {
            loading: false,
            error: action.payload,
            allPrograms: [],
            exercises: [],
        }
    }
    if(action.type === 'FETCH_ENDED') {
        return {
            loading: false,
            error: null,
            allPrograms: action.payload,
            exercises: [],
        }
    }
    
    return defaultProgramState
}

const ProgramFetchingProvider = (props) => {
    const [programState, dispatchProgramAction] = useReducer(programReducer, defaultProgramState)
 
    const fetchProgramsHandler = useCallback(async () => {
            dispatchProgramAction({type: 'FETCH_START' });
     
            const programCol = collection(db, 'programs');
            const programSnapshot = await getDocs(programCol);
            const programList = programSnapshot.docs.map(doc => doc.data());
            console.log(programList)
        
            dispatchProgramAction({type: 'FETCH_SUCCESS', payload: programList })
            return programList;
       
    }, [])
  

    useEffect(() => {
        fetchProgramsHandler();
        console.log('dispatched')
        
      }, []);


      const addExerciseToDBHandler = (exercise) => {
        dispatchProgramAction({type: 'ADD', payload: exercise});
      };


    const programsContext = {
        allPrograms: programState.allPrograms,
        exercises: programState.exercises,
        error: programState.error,
        loading: programState.loading,
        fetchPrograms: fetchProgramsHandler,
        addExerciseToDB: addExerciseToDBHandler

    }

    return (
        <ProgramsContext.Provider value = {programsContext}>
            {props.children}
        </ProgramsContext.Provider>
    )
}

export default ProgramFetchingProvider;