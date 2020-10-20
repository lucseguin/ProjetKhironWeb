import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class BedStatusNodeDetailEditor extends Component {
    constructor(props){
        super(props);

        this.editSelectedNode = this.editSelectedNode.bind(this);
        this.editSelectedLink = this.editSelectedLink.bind(this);
    }

    state = {
        selectedNode: null,
        selectedLink: null,
        linkLabel : '',

        modified: false,
      };


    editSelectedNode(node)  {
        if(node){
            console.log(node);
            this.setState({
                selectedNode: {...node}
            });
        } else {
            this.setState({
                selectedNode: null
            });
        }
    }

    editSelectedLink(link)  {
        if(link){
            console.log(link);
            this.setState({
                selectedLink: {...link}
            });
            if (link.labels.length > 0) {
                this.setState({
                    linkLabel: link.labels[0].options.label
                });
            }
        } else {
            this.setState({
                selectedLink: null,
                linkLabel : ''
            });
        }
    }

    handleStateNodeTextChange(event) {
        this.setState({
            selectedNode: {...this.state.selectedNode,  options : { ...this.state.selectedNode.options, name: event.target.value}},
            modified : true,
        });
    }

    handleStateLinkTextChange(event) {
        this.setState({
            linkLabel: event.target.value,
            modified : true,
        });
        // this.setState({
        //     selectedLink: {...this.state.selectedLink,  options : { ...this.state.selectedLink.options, name: event.target.value}},
        //     modified : true,
        // });
    }

    handleSaveStateNodeModifications(event) {
        if(this.props.onNodeUpdate) {
            this.props.onNodeUpdate(this.state.selectedNode);
            this.setState({
                modified : false,
            });
        }
    }
    handleSaveStateLinkModifications(event) {
        if(this.props.onLinkUpdate) {
            // if (this.state.selectedLink.labels.length > 0) {
            //     this.state.selectedLink.labels[0].options.label = this.state.linkLabel;
            // } else {
            //     let labelOb = new DefaultLabelModel();
            //     labelOb.setLabel(this.state.linkLabel);
            //     this.state.selectedLink.addLabel(labelOb);
            // }

            //this.props.onLinkUpdate(this.state.selectedLink);
            this.props.onLinkUpdate(this.state.selectedLink, this.state.linkLabel);
            this.setState({
                modified : false,
            });
        }
    }


    render () {
        let nodeEditor = null;
        let linkEditor = null;
    
        if(this.state.selectedNode) {
            nodeEditor = <TableContainer>
                    <Table size="small">
                    <TableBody>
                        <TableRow>
                        <TableCell>
                            <TextField id="user-state-node-text" label="Identifiant de l'état" value={this.state.selectedNode.options.name} onChange={this.handleStateNodeTextChange.bind(this)} style={{ width: '400px' }}/>
                        </TableCell>
                        <TableCell align="right">
                            {this.state.modified?
                            <Button key="btn-save-state-node" variant="contained" color="primary" onClick={this.handleSaveStateNodeModifications.bind(this)} >
                                Sauvegarder
                            </Button>:
                            <Button key="btn-save-state-node-dis" variant="contained" color="primary" disabled>
                                Sauvegarder
                            </Button>
                            }
                        </TableCell>
    
                        </TableRow>
                    </TableBody>
                    </Table>
            </TableContainer>
        } else if(this.state.selectedLink) {
            linkEditor = <TableContainer>
                    <Table size="small">
                    <TableBody>
                        <TableRow>
                        <TableCell>
                            <TextField id="user-state-link-text" label="Idenfiant de l'action" value={this.state.linkLabel} onChange={this.handleStateLinkTextChange.bind(this)} style={{ width: '400px' }}/>
                        </TableCell>
                        <TableCell align="right">
                            {this.state.modified?
                            <Button key="btn-save-link-node" variant="contained" color="primary" onClick={this.handleSaveStateLinkModifications.bind(this)} >
                                Sauvegarder
                            </Button>:
                            <Button key="btn-save-link-node-dis" variant="contained" color="primary" disabled>
                                Sauvegarder
                            </Button>
                            }
                        </TableCell>
    
                        </TableRow>
                    </TableBody>
                    </Table>
            </TableContainer>
        }

        return (this.state.selectedNode?nodeEditor:linkEditor);
    }
  }

  export default BedStatusNodeDetailEditor;
  