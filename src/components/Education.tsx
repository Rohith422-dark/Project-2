import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  BookOpen, 
  Play, 
  Search, 
  Clock, 
  Users, 
  Star,
  Download,
  Share,
  Volume2,
  Subtitles,
  Eye,
  Heart,
  Filter,
  Plus,
  Upload,
  X
} from 'lucide-react';

const videoTutorials = [
  {
    id: 'VT001',
    title: 'Understanding Water-Borne Diseases',
    description: 'A comprehensive introduction to common water-borne diseases, their causes, and prevention methods. Learn about cholera, typhoid, hepatitis A, and other diseases spread through contaminated water.',
    duration: '12:45',
    views: 2847,
    likes: 189,
    language: 'English/Hindi',
    category: 'Basics',
    difficulty: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop',
    instructor: 'Dr. Maya Sharma',
    topics: ['Disease Prevention', 'Water Safety', 'Public Health'],
    uploadDate: '2024-01-15'
  },
  {
    id: 'VT002',
    title: 'Safe Water Storage and Treatment',
    description: 'Learn proper techniques for storing and treating water to prevent contamination. Covers boiling, chlorination, filtration, and safe storage practices for rural communities.',
    duration: '8:30',
    views: 1923,
    likes: 142,
    language: 'Hindi/Assamese',
    category: 'Prevention',
    difficulty: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1541871685729-6b8b2a3b89a7?w=400&h=225&fit=crop',
    instructor: 'ASHA Worker - Rita Devi',
    topics: ['Water Treatment', 'Safe Storage', 'Community Health'],
    uploadDate: '2024-01-10'
  },
  {
    id: 'VT003',
    title: 'Recognizing Early Symptoms',
    description: 'Identify early warning signs of water-borne diseases. Learn when to seek medical help and how to provide first aid while waiting for professional care.',
    duration: '15:20',
    views: 3156,
    likes: 234,
    language: 'English/Local Dialects',
    category: 'Symptoms',
    difficulty: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=225&fit=crop',
    instructor: 'Public Health Team',
    topics: ['Symptom Recognition', 'First Aid', 'Medical Care'],
    uploadDate: '2024-01-08'
  },
  {
    id: 'VT004',
    title: 'Community Hygiene Practices',
    description: 'Essential hygiene practices for communities to prevent water-borne diseases. Covers handwashing, sanitation, waste management, and community awareness.',
    duration: '10:15',
    views: 2134,
    likes: 178,
    language: 'Hindi/Mizo',
    category: 'Hygiene',
    difficulty: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=225&fit=crop',
    instructor: 'Health Inspector',
    topics: ['Hygiene', 'Sanitation', 'Community Health'],
    uploadDate: '2024-01-05'
  },
  {
    id: 'VT005',
    title: 'Water Quality Testing at Home',
    description: 'Simple methods for testing water quality using basic tools and test kits. Learn how to identify contaminated water and take appropriate action.',
    duration: '9:45',
    views: 1567,
    likes: 89,
    language: 'English/Bengali',
    category: 'Testing',
    difficulty: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-a4dac58cd179?w=400&h=225&fit=crop',
    instructor: 'Dr. Rajesh Kumar',
    topics: ['Water Testing', 'Quality Control', 'Home Testing'],
    uploadDate: '2024-01-03'
  },
  {
    id: 'VT006',
    title: 'Emergency Response to Outbreaks',
    description: 'How communities should respond during disease outbreaks. Covers isolation procedures, reporting protocols, and community support systems.',
    duration: '13:10',
    views: 2789,
    likes: 201,
    language: 'Hindi/Nagamese',
    category: 'Emergency',
    difficulty: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=225&fit=crop',
    instructor: 'Emergency Response Team',
    topics: ['Emergency Response', 'Outbreak Management', 'Community Coordination'],
    uploadDate: '2024-01-01'
  }
];

const categories = ['All', 'Basics', 'Prevention', 'Symptoms', 'Hygiene', 'Testing', 'Emergency'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

interface EducationProps {
  educationTutorials?: any[];
  onAddTutorial?: (tutorial: any) => void;
  onDeleteTutorial?: (tutorialId: string) => void;
  userType?: 'admin' | 'resident';
}

export function Education({ 
  educationTutorials = [], 
  onAddTutorial, 
  onDeleteTutorial, 
  userType = 'resident' 
}: EducationProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: 'Basics',
    difficulty: 'Beginner',
    duration: '',
    language: '',
    instructor: '',
    topics: '',
    thumbnailUrl: ''
  });

  // Combine static videos with dynamic tutorials
  const allVideos = [...videoTutorials, ...educationTutorials.map(tutorial => ({
    id: tutorial.id,
    title: tutorial.title,
    description: tutorial.description,
    duration: tutorial.duration || '10:00',
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 50) + 10,
    language: tutorial.language || 'English',
    category: tutorial.category || 'Basics',
    difficulty: 'Beginner',
    thumbnail: tutorial.thumbnailUrl || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop',
    instructor: tutorial.instructor || 'Health Official',
    topics: tutorial.topics ? tutorial.topics.split(',').map(t => t.trim()) : ['Health Education'],
    uploadDate: tutorial.createdDate || new Date().toISOString().split('T')[0]
  }))];

  const handleAddVideo = () => {
    if (!onAddTutorial) return;

    const videoData = {
      title: newVideo.title,
      description: newVideo.description,
      category: newVideo.category,
      duration: newVideo.duration,
      language: newVideo.language,
      instructor: newVideo.instructor,
      topics: newVideo.topics,
      thumbnailUrl: newVideo.thumbnailUrl || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop',
      targetAudience: 'Community'
    };

    onAddTutorial(videoData);
    setNewVideo({
      title: '',
      description: '',
      category: 'Basics',
      difficulty: 'Beginner',
      duration: '',
      language: '',
      instructor: '',
      topics: '',
      thumbnailUrl: ''
    });
    setShowAddVideo(false);
  };

  const filteredVideos = allVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || video.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Basics': return 'bg-blue-100 text-blue-800';
      case 'Prevention': return 'bg-green-100 text-green-800';
      case 'Symptoms': return 'bg-orange-100 text-orange-800';
      case 'Hygiene': return 'bg-purple-100 text-purple-800';
      case 'Testing': return 'bg-indigo-100 text-indigo-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1>Health Education Center</h1>
          </div>
          {userType === 'admin' && (
            <Button onClick={() => setShowAddVideo(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Video
            </Button>
          )}
        </div>
        <p className="text-gray-600">Educational resources and video tutorials for water-borne disease awareness and prevention</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl">{allVideos.length}</p>
                <p className="text-sm text-gray-600">Video Tutorials</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl">{allVideos.reduce((sum, video) => sum + video.views, 0).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl">{allVideos.reduce((sum, video) => sum + video.likes, 0)}</p>
                <p className="text-sm text-gray-600">Total Likes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl">6</p>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tutorials, topics, or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <select 
                value={selectedDifficulty} 
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'All' ? 'All Levels' : difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card 
            key={video.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-blue-600 ml-1" />
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getDifficultyColor(video.difficulty)}>
                  {video.difficulty}
                </Badge>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="mb-3">
                <Badge className={getCategoryColor(video.category)} variant="secondary">
                  {video.category}
                </Badge>
              </div>
              
              <h3 className="mb-2 line-clamp-2">{video.title}</h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {video.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{video.instructor}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{video.likes}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Volume2 className="w-4 h-4" />
                  <span>{video.language}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {video.topics.slice(0, 3).map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Tutorial
                </Button>
                {userType === 'admin' && video.id.startsWith('EDU') && onDeleteTutorial && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to delete this video tutorial?')) {
                        onDeleteTutorial(video.id);
                      }
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Delete Video
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Play className="w-6 h-6 text-blue-600" />
                <span>{selectedVideo.title}</span>
              </DialogTitle>
              <DialogDescription>
                Watch this educational video tutorial about {selectedVideo.category.toLowerCase()} - Duration: {selectedVideo.duration}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Video Player Placeholder */}
              <div className="relative bg-gray-900 rounded-lg">
                <img 
                  src={selectedVideo.thumbnail} 
                  alt={selectedVideo.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-blue-600 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
                  {selectedVideo.duration}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge className={getCategoryColor(selectedVideo.category)}>
                      {selectedVideo.category}
                    </Badge>
                    <Badge className={getDifficultyColor(selectedVideo.difficulty)}>
                      {selectedVideo.difficulty}
                    </Badge>
                  </div>
                  
                  <h2 className="mb-3">{selectedVideo.title}</h2>
                  
                  <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedVideo.topics.map((topic, index) => (
                      <Badge key={index} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedVideo.views.toLocaleString()} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedVideo.likes} likes</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedVideo.duration}</span>
                    </span>
                  </div>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Video Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Instructor</p>
                        <p>{selectedVideo.instructor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Language</p>
                        <p>{selectedVideo.language}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Upload Date</p>
                        <p>{selectedVideo.uploadDate}</p>
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Video Modal */}
      <Dialog open={showAddVideo} onOpenChange={setShowAddVideo}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-green-600" />
              Add New Educational Video
            </DialogTitle>
            <DialogDescription>
              Create a new educational video tutorial for the community health education program
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="video-title">Video Title</Label>
                <Input
                  id="video-title"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                  placeholder="Enter video title"
                />
              </div>
              <div>
                <Label htmlFor="video-duration">Duration (mm:ss)</Label>
                <Input
                  id="video-duration"
                  value={newVideo.duration}
                  onChange={(e) => setNewVideo({...newVideo, duration: e.target.value})}
                  placeholder="e.g., 12:45"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="video-description">Description</Label>
              <Textarea
                id="video-description"
                value={newVideo.description}
                onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                placeholder="Describe what this video teaches and its learning objectives"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="video-category">Category</Label>
                <select
                  id="video-category"
                  value={newVideo.category}
                  onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Basics">Basics</option>
                  <option value="Prevention">Prevention</option>
                  <option value="Symptoms">Symptoms</option>
                  <option value="Hygiene">Hygiene</option>
                  <option value="Testing">Testing</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
              <div>
                <Label htmlFor="video-difficulty">Difficulty Level</Label>
                <select
                  id="video-difficulty"
                  value={newVideo.difficulty}
                  onChange={(e) => setNewVideo({...newVideo, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="video-instructor">Instructor/Creator</Label>
                <Input
                  id="video-instructor"
                  value={newVideo.instructor}
                  onChange={(e) => setNewVideo({...newVideo, instructor: e.target.value})}
                  placeholder="e.g., Dr. Maya Sharma"
                />
              </div>
              <div>
                <Label htmlFor="video-language">Language</Label>
                <Input
                  id="video-language"
                  value={newVideo.language}
                  onChange={(e) => setNewVideo({...newVideo, language: e.target.value})}
                  placeholder="e.g., English/Hindi"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="video-topics">Topics (comma-separated)</Label>
              <Input
                id="video-topics"
                value={newVideo.topics}
                onChange={(e) => setNewVideo({...newVideo, topics: e.target.value})}
                placeholder="e.g., Water Safety, Disease Prevention, Public Health"
              />
            </div>

            <div>
              <Label htmlFor="video-thumbnail">Thumbnail URL (optional)</Label>
              <Input
                id="video-thumbnail"
                value={newVideo.thumbnailUrl}
                onChange={(e) => setNewVideo({...newVideo, thumbnailUrl: e.target.value})}
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Note:</strong> This creates a tutorial entry in the education system. 
                The actual video file should be uploaded separately to your video hosting platform.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddVideo}
                className="bg-green-600 hover:bg-green-700"
                disabled={!newVideo.title || !newVideo.description || !newVideo.instructor}
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Video Tutorial
              </Button>
              <Button variant="outline" onClick={() => setShowAddVideo(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}