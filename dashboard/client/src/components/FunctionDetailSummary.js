import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { ButtonGroup, Button, Col, ProgressBar } from 'react-bootstrap';
import './FunctionDetailSummary.css';

const renderContainerImage = image => {
  const imageWithoutTag = image.split(':')[0];
  const parts = imageWithoutTag.split('/');

  if (parts.length === 2) {
    return (
      <a
        href={`https://hub.docker.com/r/${parts[0]}/${parts[1]}/tags`}
        target="_blank"
      >
        {image}
      </a>
    );
  } else {
    return image;
  }
};

const checkDefaultStats = stats => {
  if (stats === true){
    console.log('1hour active')
    return 'active'
  } else {
    console.log('24hour active')
    return ''
  }
}
export const FunctionDetailSummary = ({ fn, statsForOneHour, toggleStatsPeriod, handleShowBadgeModal }) => {
  const to = `${fn.shortName}/log?repoPath=${fn.gitOwner}/${
    fn.gitRepo
  }&commitSHA=${fn.gitSha}`;
  const repo = `${fn.gitOwner}/${fn.gitRepo}`;
  return (
    <div className="fn-detail-summary row">
      <Col sm={6} md={5}>
        <div className="panel panel-default fn-detail-deployment">
          <div className="panel-body">
            <div>
              <div className="pull-right">
                <Link className="btn btn-default" to={to}>
                  <FontAwesomeIcon icon="folder-open" /> Build Logs
                </Link>
              </div>
              <h4>
                Deployment <FontAwesomeIcon icon="info-circle" />
              </h4>
            </div>
            <dl className="dl-horizontal">
              <dt>Name:</dt>
              <dd>{fn.shortName}</dd>
              <dt>Image:</dt>
              <dd>{renderContainerImage(fn.image)}</dd>
              <dt>Endpoint:</dt>
              <dd>
                <a href={fn.endpoint} target="_blank">
                  {fn.endpoint}
                </a>
              </dd>
              <dt>Replicas:</dt>
              <dd>{fn.replicas}</dd>
            </dl>
          </div>
        </div>
      </Col>
      <Col sm={6} md={4}>
        <div className="panel panel-default fn-detail-git">
          <div className="panel-body">
            <div>
              <div className="pull-right">
                <Button className="btn btn-default" onClick={handleShowBadgeModal} to="#">
                  <FontAwesomeIcon icon={faAward} /> Get Badge
                </Button>
              </div>
              <h4>
                Git <FontAwesomeIcon icon="code-branch" />
              </h4>
            </div>
            <dl className="dl-horizontal">
              <dt>Repository:</dt>
              <dd>
                <a href={`https://github.com/${repo}`} target="_blank">
                  {repo}
                </a>
              </dd>
              <dt>SHA:</dt>
              <dd>
                <a
                  href={`https://github.com/${repo}/commit/${fn.gitSha}`}
                  target="_blank"
                >{`${fn.gitSha}`}</a>
              </dd>
              <dt>Deploy Time:</dt>
              <dd>{`${fn.sinceDuration}`}</dd>
            </dl>
          </div>
        </div>
      </Col>
      <Col sm={6} md={3}>
        <div className="panel panel-default invocation-count">
          <div className="panel-body">
            <div>
              <div className="pull-right">
                <div>
                <ButtonGroup>
                  <Button className={checkDefaultStats(statsForOneHour)} onClick={toggleStatsPeriod} >1h</Button>
                  <Button className={checkDefaultStats(!statsForOneHour)} onClick={toggleStatsPeriod}>24h</Button>  
                </ButtonGroup>  
                </div>

              </div>
              <h4>
                Stats <FontAwesomeIcon icon="bolt" />
              </h4>
              <br/> 
              <div>
                <ProgressBar max={100} id="stats-bar">
                  <ProgressBar striped bsStyle="success" now={75} key={1} />
                  <ProgressBar active bsStyle="danger" now={15} key={2} />
                </ProgressBar>
              </div>
                  Total: 10 <br/>
                  Success: 8 <br/>
                  Error: 2 <br/> <br/>

            </div>     
          </div>
        </div>
      </Col>
    </div>
  );
};

FunctionDetailSummary.propTypes = {
  fn: PropTypes.object.isRequired,  
  handleShowBadgeModal: PropTypes.func.isRequired,
};
