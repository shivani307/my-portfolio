import { Container } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { projects } from '../data/constants';

const DescriptionText = styled.p`
  margin: 20px 0;
  text-align: center;
  color: #555;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  overflow: hidden
`;

const ProjectsTile = styled.div`
  width: 100%; 
  background-color: ${({ theme }) => theme.card};
  max-width: 300px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
  cursor: pointer;
  padding: 26px 20px;
  transition: all 0.5s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
  

`;
const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 5px;
`;

const ProjectDetails = styled.div`
  padding: 15px 0px;
  
`;

const ProjectName = styled.h3`
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text_primary};
`;

const ProjectDescription = styled.p`
  margin-bottom: 10px;
  overflow: hidden;
  color: rgba(177, 178, 179, 0.6);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ViewCodeButton = styled.a`
display: block;
background-color: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text_primary};
padding: 8px 15px;
text-align: center;
text-decoration: none;
border-radius: 3px;
cursor: pointer;
transition: background-color 0.3s ease;

&:hover {
  background-color: ${({ theme }) => theme.primary};
}
`;



const ProjectDetailContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100%;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ProjectDetailBox = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
  max-width: 600px;
  width: 100%;
  max-height: 80vh; 
  overflow-y: auto;
`;


const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 50px;
  color: #555;
  cursor: pointer;
`;

export const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
margin-top: 12px;
      font-size: 32px;
  }
`;

const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`

const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
`

const ProjectDetail = ({ project, onClose }) => {
  return (
    <ProjectDetailContainer>
      <ProjectDetailBox>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ProjectImage src={project.image} alt={project.title} />
        <ProjectDetails>
          <ProjectName>{project.title}</ProjectName>
          <Tags>
                {project.tags?.map((tag, index) => (
                <Tag>{tag}</Tag>
                ))}
          </Tags>
        </ProjectDetails>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ViewCodeButton href={project.codeLink} target="_blank" rel="noopener noreferrer">
          View Code
        </ViewCodeButton>
      </ProjectDetailBox>
    </ProjectDetailContainer>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <Container id="projects">
    <DescriptionText >
      <Title>Projects</Title>
        Explore some of my projects below. Click on "View Code" to see the source code on GitHub.
    </DescriptionText>
    <ProjectsContainer >
      {projects.map((project) => (
        <ProjectsTile key={project.id} onClick={() => handleProjectClick(project)}>
          <ProjectImage src={project.image} alt={project.title} />
          <ProjectDetails>
            <ProjectName>{project.title}</ProjectName>
            <Tags>
                {project.tags?.map((tag, index) => (
                <Tag>{tag}</Tag>
                ))}
            </Tags>
          </ProjectDetails>
          <ProjectDescription>{project.description}</ProjectDescription>
        </ProjectsTile>
      ))}
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={handleCloseProjectDetail} />
      )}
    </ProjectsContainer>
    </Container>
  );
};

export default Projects;

