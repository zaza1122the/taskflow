package com.zahit.taskflow.controller;

import com.zahit.taskflow.model.Task;
import com.zahit.taskflow.model.User;
import com.zahit.taskflow.repository.TaskRepository;
import com.zahit.taskflow.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private UserRepository userRepository;

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {

        User user = userRepository.findByEmail("zahit@email.com")
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setUser(user);

        return taskRepository.save(task);
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }

    @GetMapping("/my")
    public List<Task> getMyTasks() {

        return taskRepository.findAll();

    }
}