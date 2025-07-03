
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Cloud, Terminal, Book, ExternalLink } from 'lucide-react';

const TechCornerTab = () => {
  const [activeSubTab, setActiveSubTab] = useState('sops');

  const sopsData = [
    {
      id: '1',
      title: 'Docker Container Deployment Guide',
      category: 'DevOps',
      description: 'Step-by-step guide for deploying Docker containers in production environments.',
      lastUpdated: '2024-01-15',
      type: 'SOP'
    },
    {
      id: '2',
      title: 'AWS EC2 Instance Setup',
      category: 'Cloud',
      description: 'Complete documentation for setting up and configuring AWS EC2 instances.',
      lastUpdated: '2024-01-12',
      type: 'Documentation'
    },
    {
      id: '3',
      title: 'Kubernetes Cluster Management',
      category: 'DevOps',
      description: 'Best practices for managing Kubernetes clusters in production.',
      lastUpdated: '2024-01-10',
      type: 'Best Practices'
    }
  ];

  const tipsData = [
    {
      id: '1',
      title: 'Optimize Docker Images',
      category: 'Docker',
      tip: 'Use multi-stage builds and .dockerignore to reduce image size and improve build times.',
      tags: ['docker', 'optimization', 'performance']
    },
    {
      id: '2',
      title: 'AWS Cost Optimization',
      category: 'AWS',
      tip: 'Use AWS Cost Explorer and set up billing alerts to monitor and optimize your cloud spending.',
      tags: ['aws', 'cost', 'monitoring']
    },
    {
      id: '3',
      title: 'Git Branch Strategy',
      category: 'Git',
      tip: 'Implement GitFlow or GitHub Flow for better collaboration and code management.',
      tags: ['git', 'workflow', 'collaboration']
    }
  ];

  const cheatsheetsData = [
    {
      id: '1',
      title: 'AWS CLI Commands',
      category: 'AWS',
      description: 'Essential AWS CLI commands for common operations.',
      commands: [
        'aws s3 ls - List S3 buckets',
        'aws ec2 describe-instances - List EC2 instances',
        'aws iam list-users - List IAM users',
        'aws logs describe-log-groups - List CloudWatch log groups'
      ]
    },
    {
      id: '2',
      title: 'Docker Commands',
      category: 'Docker',
      description: 'Most commonly used Docker commands for container management.',
      commands: [
        'docker ps - List running containers',
        'docker images - List local images',
        'docker build -t name . - Build image from Dockerfile',
        'docker exec -it container_id bash - Access container shell'
      ]
    },
    {
      id: '3',
      title: 'Kubernetes kubectl',
      category: 'Kubernetes',
      description: 'Essential kubectl commands for Kubernetes cluster management.',
      commands: [
        'kubectl get pods - List pods',
        'kubectl get services - List services',
        'kubectl describe pod <pod-name> - Pod details',
        'kubectl logs <pod-name> - View pod logs'
      ]
    },
    {
      id: '4',
      title: 'VMware vSphere',
      category: 'VMware',
      description: 'Common VMware vSphere operations and PowerCLI commands.',
      commands: [
        'Get-VM - List virtual machines',
        'New-VM - Create new virtual machine',
        'Start-VM - Power on virtual machine',
        'Get-VMHost - List ESXi hosts'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sops" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            SOPs & Docs
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            DevOps Tips
          </TabsTrigger>
          <TabsTrigger value="cheatsheets" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            Cheatsheets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sops" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sopsData.map((sop) => (
              <Card key={sop.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{sop.title}</CardTitle>
                      <CardDescription>{sop.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{sop.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{sop.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Updated: {sop.lastUpdated}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Book className="h-4 w-4 mr-2" />
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tipsData.map((tip) => (
              <Card key={tip.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-primary" />
                    {tip.title}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit">{tip.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tip.tip}</p>
                  <div className="flex flex-wrap gap-2">
                    {tip.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cheatsheets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cheatsheetsData.map((cheatsheet) => (
              <Card key={cheatsheet.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    {cheatsheet.title}
                  </CardTitle>
                  <CardDescription>{cheatsheet.description}</CardDescription>
                  <Badge variant="outline" className="w-fit">{cheatsheet.category}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {cheatsheet.commands.map((command, index) => (
                      <div key={index} className="bg-muted p-2 rounded text-sm font-mono">
                        {command}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechCornerTab;
