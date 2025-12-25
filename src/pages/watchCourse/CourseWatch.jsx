import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Share2, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
  CheckCircle,
  Circle
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const CourseWatch = () => {
  const {id}= useParams()
  // const courseId = ; // Get from URL params in real app
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedChapters, setExpandedChapters] = useState({});
  const [currentVideo, setCurrentVideo] = useState(null);
  const [completedLectures, setCompletedLectures] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const apiKey = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/users/me/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        setCourseData(response.data.data);
        
        // Set first lecture as default video
        if (response.data.data.chapters?.[0]?.chapter?.lectures?.[0]?.lecture) {
          setCurrentVideo(response.data.data.chapters[0].chapter.lectures[0].lecture);
        }
        
        // Expand first chapter by default
        if (response.data.data.chapters?.[0]?.chapter?._id) {
          setExpandedChapters({ [response.data.data.chapters[0].chapter._id]: true });
        }
        
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id, apiKey]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleLectureClick = (lecture) => {
    setCurrentVideo(lecture);
  };

  const toggleLectureComplete = (lectureId) => {
    setCompletedLectures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lectureId)) {
        newSet.delete(lectureId);
      } else {
        newSet.add(lectureId);
      }
      return newSet;
    });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '0 minutes';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')} hour ${String(mins).padStart(2, '0')} minutes`;
    }
    return `${String(mins).padStart(2, '0')} minutes`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!courseData) return null;

  return (
    <div className="min-h-screen bg-gray-50 mt-8">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left Side - Video and Course Info */}
          <div className="lg:col-span-2 bg-white">
            {/* Video Player */}
            <div className="relative  aspect-video">
              {currentVideo ? (
                <video
                  key={currentVideo._id}
                  controls
                  className="w-full h-full"
                  src={currentVideo.videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayCircle size={64} className="mx-auto mb-4 opacity-50" />
                    <p>No video selected</p>
                  </div>
                </div>
              )}
            </div>

            {/* Course Title and Stats */}
            <div className="p-6 border-b border-[#ddd]">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {courseData.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span className="text-sm">
                    {courseData.totalEnrollments || 8350} Students are watching
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#ddd]">
              <div className="flex gap-4 px-6">
                {['overview', 'description',  'instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Course Details</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {courseData.description}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Level</p>
                        <p className="text-lg font-semibold capitalize">{courseData.level}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Duration</p>
                        <p className="text-lg font-semibold">{courseData.totalDuration}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Lectures</p>
                        <p className="text-lg font-semibold">{courseData.totalLectures}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-lg font-semibold">⭐ {courseData.rating}/5</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{courseData.description}</p>
                </div>
              )}
              
              {/* {activeTab === 'certificates' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Certificates</h2>
                  <p className="text-gray-600">Complete all lectures to earn your certificate.</p>
                </div>
              )} */}
              
              {activeTab === 'instructor' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Instructor</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                      {courseData.instructor.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{courseData.instructor.fullName}</h3>
                      <p className="text-gray-600">{courseData.instructor.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Chapters and Lectures */}
          <div className="bg-green-50 border-l overflow-y-auto border-[#ddd]" style={{ maxHeight: '100vh' }}>
            <div className="sticky top-0 bg-green-100 p-4 border-b border-green-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Course Content</h2>
              <button className="text-green-700 hover:text-green-900">
                <Share2 size={20} />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {courseData.chapters && courseData.chapters.length > 0 ? (
                courseData.chapters.map((chapterItem, chapterIndex) => {
                  const chapter = chapterItem.chapter;
                  const isExpanded = expandedChapters[chapter._id];
                  
                  return (
                    <div key={chapter._id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                      {/* Chapter Header */}
                      <button
                        onClick={() => toggleChapter(chapter._id)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown size={20} className="text-green-600" />
                          ) : (
                            <ChevronUp size={20} className="text-gray-400" />
                          )}
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">{chapter.title}</p>
                            <p className="text-xs text-gray-500">
                              {formatDuration(
                                chapter.lectures.reduce((acc, lec) => acc + (lec.lecture.duration || 0), 0)
                              )}
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* Lectures */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 ">
                          {chapter.lectures.map((lectureItem, lectureIndex) => {
                            const lecture = lectureItem.lecture;
                            const isCompleted = completedLectures.has(lecture._id);
                            const isActive = currentVideo?._id === lecture._id;

                            return (
                              <div
                                key={lecture._id}
                                className={`flex items-center gap-3 px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                                  isActive ? 'bg-green-100' : ''
                                }`}
                                onClick={() => handleLectureClick(lecture)}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLectureComplete(lecture._id);
                                  }}
                                  className="flex-shrink-0"
                                >
                                  {isCompleted ? (
                                    <CheckCircle size={20} className="text-green-600" />
                                  ) : (
                                    <Circle size={20} className="text-gray-300" />
                                  )}
                                </button>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium truncate ${
                                    isActive ? 'text-green-700' : 'text-gray-900'
                                  }`}>
                                    {String(chapterIndex + 1).padStart(2, '0')}. {lecture.title}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatDuration(lecture.duration)}
                                  </p>
                                </div>
                                {isActive && (
                                  <PlayCircle size={18} className="text-green-600 flex-shrink-0" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No chapters available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseWatch;