<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { tasksAPI } from '../utils/api';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Task } from '../types';
import ThemeToggle from '../components/ThemeToggle';


const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(100),
  description: z.string().max(500).optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
=======
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { tasksAPI } from "../utils/api";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Task } from "../types";
import ThemeToggle from "../components/ThemeToggle";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required").max(100),
  description: z.string().max(500).optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
});

type TaskFormData = z.infer<typeof taskSchema>;

const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (id) fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await tasksAPI.getById(id!);
      const taskData = response.task;
      setTask(taskData);

      reset({
        title: taskData.title,
<<<<<<< HEAD
        description: taskData.description || '',
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : '',
        priority: taskData.priority,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch task');
      navigate('/dashboard');
=======
        description: taskData.description || "",
        dueDate: taskData.dueDate
          ? new Date(taskData.dueDate).toISOString().split("T")[0]
          : "",
        priority: taskData.priority,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch task");
      navigate("/dashboard");
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: TaskFormData) => {
    setSaving(true);
    try {
      await tasksAPI.update(id!, data);
<<<<<<< HEAD
      toast.success('Task updated successfully');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update task');
=======
      toast.success("Task updated successfully");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update task");
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
<<<<<<< HEAD
    if (!confirm('Are you sure you want to delete this task?')) return;
=======
    if (!confirm("Are you sure you want to delete this task?")) return;
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db

    setDeleting(true);
    try {
      await tasksAPI.delete(id!);
<<<<<<< HEAD
      toast.success('Task deleted successfully');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
=======
      toast.success("Task deleted successfully");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete task");
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-destructive">Task not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow border-b border-gray-200 dark:border-gray-700">
<<<<<<< HEAD
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
    <Link
      to="/dashboard"
      className="text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Dashboard
    </Link>
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold text-foreground dark:text-foreground-dark">Edit Task</h1>
      <ThemeToggle />
    </div>
  </div>
</header>

       
=======
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link
            to="/dashboard"
            className="text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground dark:text-foreground-dark">
              Edit Task
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
      {/* Form */}
      <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-background shadow rounded-lg border border-border">
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
<<<<<<< HEAD
                <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-2">
=======
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
<<<<<<< HEAD
                  {...register('title')}
=======
                  {...register("title")}
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Enter task title"
                />
                {errors.title && (
<<<<<<< HEAD
                  <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
=======
                  <p className="mt-1 text-sm text-destructive">
                    {errors.title.message}
                  </p>
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                )}
              </div>

              <div>
<<<<<<< HEAD
                <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-2">
=======
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                  Description
                </label>
                <textarea
                  id="description"
<<<<<<< HEAD
                  {...register('description')}
=======
                  {...register("description")}
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Enter task description (optional)"
                />
                {errors.description && (
<<<<<<< HEAD
                  <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>
=======
                  <p className="mt-1 text-sm text-destructive">
                    {errors.description.message}
                  </p>
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                )}
              </div>

              <div>
<<<<<<< HEAD
                <label htmlFor="dueDate" className="block text-sm font-medium text-muted-foreground mb-2">
=======
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
<<<<<<< HEAD
                  {...register('dueDate')}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-destructive">{errors.dueDate.message}</p>
=======
                  {...register("dueDate")}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.dueDate.message}
                  </p>
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                )}
              </div>

              <div>
<<<<<<< HEAD
                <label htmlFor="priority" className="block text-sm font-medium text-muted-foreground mb-2">
=======
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                  Priority
                </label>
                <select
                  id="priority"
<<<<<<< HEAD
                  {...register('priority')}
=======
                  {...register("priority")}
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && (
<<<<<<< HEAD
                  <p className="mt-1 text-sm text-destructive">{errors.priority.message}</p>
=======
                  <p className="mt-1 text-sm text-destructive">
                    {errors.priority.message}
                  </p>
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                )}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
<<<<<<< HEAD
                  {deleting ? 'Deleting...' : 'Delete Task'}
=======
                  {deleting ? "Deleting..." : "Delete Task"}
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
<<<<<<< HEAD
                  {saving ? 'Saving...' : 'Save Changes'}
=======
                  {saving ? "Saving..." : "Save Changes"}
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditTaskPage;
