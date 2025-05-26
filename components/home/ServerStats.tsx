"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, MessageSquare, Zap, Award } from 'lucide-react'

// Mock data for charts
const memberGrowthData = [
  { name: 'Jan', members: 1100 },
  { name: 'Feb', members: 1400 },
  { name: 'Mar', members: 2000 },
  { name: 'Apr', members: 2500 },
  { name: 'May', members: 3200 },
  { name: 'Jun', members: 4000 },
  { name: 'Jul', members: 4800 },
  { name: 'Aug', members: 5432 },
]

const messageActivityData = [
  { name: 'Mon', messages: 321 },
  { name: 'Tue', messages: 289 },
  { name: 'Wed', messages: 412 },
  { name: 'Thu', messages: 356 },
  { name: 'Fri', messages: 498 },
  { name: 'Sat', messages: 612 },
  { name: 'Sun', messages: 543 },
]

const channelActivityData = [
  { name: '# general', value: 30 },
  { name: '# tech', value: 25 },
  { name: '# spirituality', value: 20 },
  { name: '# art', value: 15 },
  { name: '# music', value: 10 },
]

const COLORS = ['hsl(var(--divine-purple))', 'hsl(var(--divine-blue))', 'hsl(var(--divine-gold))', 'hsl(var(--divine-saffron))', 'hsl(var(--divine-red))']

export default function ServerStats() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Server Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our thriving community with real-time statistics and analytics.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            icon={<Users className="h-5 w-5 text-divine-purple" />}
            title="Total Members"
            value="5,432"
            trend="+432 this month"
            trendUp={true}
          />
          
          <StatsCard 
            icon={<MessageSquare className="h-5 w-5 text-divine-blue" />}
            title="Messages Sent"
            value="128,745"
            trend="+3,245 this week"
            trendUp={true}
          />
          
          <StatsCard 
            icon={<Zap className="h-5 w-5 text-divine-gold" />}
            title="Server Boosts"
            value="42"
            trend="Level 3 achieved!"
            trendUp={true}
          />
          
          <StatsCard 
            icon={<Award className="h-5 w-5 text-divine-saffron" />}
            title="Active Roles"
            value="24"
            trend="4 divine roles"
            trendUp={false}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Member Growth</CardTitle>
                <CardDescription>Monthly growth over the past 8 months</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {isClient && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={memberGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" vertical={false} />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--card-foreground))'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="members" 
                        stroke="hsl(var(--divine-purple))" 
                        strokeWidth={3}
                        dot={{ stroke: 'hsl(var(--divine-purple))', strokeWidth: 2, r: 4 }}
                        activeDot={{ stroke: 'hsl(var(--card))', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Message Activity</CardTitle>
                <CardDescription>Daily message count for the past week</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {isClient && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={messageActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" vertical={false} />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--card-foreground))'
                        }} 
                      />
                      <Bar 
                        dataKey="messages" 
                        fill="hsl(var(--divine-blue))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Channel Activity</CardTitle>
              <CardDescription>Distribution of activity across top channels</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              {isClient && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelActivityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {channelActivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--card-foreground))'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

interface StatsCardProps {
  icon: React.ReactNode
  title: string
  value: string
  trend: string
  trendUp: boolean
}

function StatsCard({ icon, title, value, trend, trendUp }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className={`text-xs mt-1 ${trendUp ? 'text-green-500' : 'text-muted-foreground'}`}>
            {trend}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}