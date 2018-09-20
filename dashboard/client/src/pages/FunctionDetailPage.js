import React, { Component } from 'react';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Modal, Button, Form, FormControl, FormGroup, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { copy } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { functionsApi } from '../api/functionsApi';
import { FunctionDetailSummary } from '../components/FunctionDetailSummary';

export class FunctionDetailPage extends Component {
  constructor(props) {
    super(props);
    const { repoPath } = queryString.parse(props.location.search);
    const { user, functionName } = props.match.params;
    this.handleShowBadgeModal = this.handleShowBadgeModal.bind(this);
    this.handleCloseBadgeModal = this.handleCloseBadgeModal.bind(this);
    this.state = {
      isLoading: true,
      fn: null,
      user,
      repoPath,
      functionName,
      showBadgeModal: false,
      copiedIcon: false,
    };    
  }
  componentDidMount() {
    const { user, repoPath, functionName } = this.state;
    this.setState({ isLoading: true });
    functionsApi.fetchFunction(user, repoPath, functionName).then(res => {
      this.setState({ isLoading: false, fn: res });
    });
  }
  handleCloseBadgeModal() {
    this.setState({ 
      showBadgeModal: false,
      copiedIcon: false, 
    });
  }

  handleShowBadgeModal() {
    this.setState({ showBadgeModal: true });
  }
  render() {
    const { isLoading, fn } = this.state;
    const badgeImage = "https://img.shields.io/badge/openfaas-cloud-blue.svg"
    const badgeLink = "https://www.openfaas.com"
    const badgeMd = `[![OpenFaaS](${badgeImage})](${badgeLink})`
    let panelBody;
    
    if (isLoading) {
      panelBody = (
        <div className="panel-body">
          <div style={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon="spinner" spin />{' '}
          </div>
        </div>
      );
    } else {
      panelBody = (
        <div className="panel-body">
          <FunctionDetailSummary fn={fn} handleShowBadgeModal={this.handleShowBadgeModal}/>
        </div>
      );
    }
    return (
      <div className="panel panel-success">
        <div className="panel-heading">Function Overview</div>
        {panelBody}
          <Modal show={this.state.showBadgeModal} onHide={this.handleCloseBadgeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Get Badge</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <Link to={badgeLink}>
                  <img src={badgeImage} alt="OpenFaaS" />
                </Link>
              </p>
              <Form horizontal>
                <FormGroup
                  controlId="formGetBadge"
                  bsSize="small"
                >
                  <Col sm={10}>
                    <FormControl
                      type="text"
                      value={badgeMd}
                      onChange={() => this.setState({ copiedIcon: false })}
                    />
                  </Col>
                  <Col sm={2}>
                    <CopyToClipboard
                    onCopy={() => this.setState({ copiedIcon: true })}
                    text={badgeMd}
                    >
                      <Button bsSize="small">
                        <FontAwesomeIcon icon={faCopy} /> Copy
                      </Button>
                    </CopyToClipboard>
                  </Col>
                </FormGroup> 
                <FormGroup>
                  <Col sm={12}>
                  {this.state.copiedIcon ? <span style={{color: 'green'}}>Copied.</span> : null}
                  </Col>
                </FormGroup>               
              </Form>
              
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}
