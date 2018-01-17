import React, { Component } from 'react';
import axios from 'axios';
// import '../stylesheets/components/ProjectInfo.css';
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';

class ProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: null,
            ownerName: null
        }
    }
    componentDidMount() {
        const currentProject = this.props.projects.filter((project) => {
            return project._id === this.props.match.params.id
        });

        const ownerId = currentProject[0].owner;
        console.log('get user', '/api/users/' + ownerId);
        axios.get('/api/users/' + ownerId)
        .then(res => {
            console.log('owner info', res.data);
            let ownerName = res.data.displayName ? 
                res.data.displayName : currentProject[0].owner;
            this.setState({
                project: currentProject[0],
                ownerName: ownerName
            })
        })
        .catch(err => {
            console.error(err);
            // Set project info even if owner name couldn't be retrieved
            this.setState({
                project: currentProject[0],
                ownerName: currentProject[0].owner
            });    
        })
    }
    handleDelete = () => {
        this.props.deleteProject(this.state.project);
    }
    render() {
        if (!this.state.project) {
            return <h3>Loading...</h3>;
        }
        
        let buttons = null;
        if (this.props.user && this.props.user._id === this.state.project.owner) {
            buttons = (
                <div className='d-flex justify-content-around'>
                    <Button label='Edit' redirect={'/project/edit/'+this.state.project._id}/>
                    <Button label='Delete' onClick={this.handleDelete}/>
                </div>
            );
        } else {
            buttons = (
                <div className='d-flex justify-content-around'>
                    <Button label='Contact Project Owner' />
                </div>
            );
        }
        
        return (
        <div className="container">
            <div className="row ">
                <div className="col">
                    <div className="material-card">
                        <div className="project-meta row">
                            <p className="project-category col">{this.state.project.category}</p>
                            <p className="project-owner col text-md-right">{this.state.ownerName}</p>
                            <hr/>
                        </div>
                        <h1>{this.state.project.title}</h1>
                        <p>{this.state.project.description}</p>
                        <div className="row">
                            <div className="project-attachments col-md-6">
                                <h2>Attachments</h2>
                                <img src="currentProject[0].img" className="img-fluid" alt="Project image"/>
                            </div>
                            <div className="project-tech col-md-4">
                                <h3>Github repo</h3>
                                <a href="{currentProject[0].repoUrl}">{this.state.project.repoUrl}</a>
                                <h3>Stack</h3>
                                <ul>{this.state.project.stack.map((item) => {
                                    return <li>{item}</li>; })}
                                </ul>      
                            </div>
                        </div>  
                        {buttons}
                    </div>
                <Button label="Back to main" />
                </div>
            </div>
        </div>
        );        
    }

}

export default ProjectInfo;
