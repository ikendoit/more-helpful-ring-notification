import React from 'react'
import { Card, Col, Row,  message } from 'antd';
import { getVideosMeta } from "./utils"

// list out all videos past 1 day
const VideosListingComponent = (props) => {

  const [ videos, setVideos ] = React.useState([])

  const getVideos = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const result = await getVideosMeta(refreshToken)
      message.success('loaded videos information')
      console.log(result)
    } catch(err){
      console.log(err)
    }

    // call set videos
  }

  React.useEffect( () => {
    getVideos()
  }, [])

  return (
    <div className="video-listing-container">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title 1" bordered={false}>
            Card content 1
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title 2" bordered={false}>
            Card content 2
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title 3" bordered={false}>
            Card content 3
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default VideosListingComponent
