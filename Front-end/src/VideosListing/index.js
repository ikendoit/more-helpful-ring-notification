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
      setVideos(result)
    } catch(err){
      console.log(err)
    }

  }

  React.useEffect( () => {
    getVideos()
  }, [])

  return (
    <div className="video-listing-container">
      <Row gutter={[16, 16]}>
        {
          videos.map( videoEvent => (
            <Col span={8}>
              <Card title={videoEvent.cameraName} bordered={false}>
                {videoEvent.created_at}
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default VideosListingComponent
