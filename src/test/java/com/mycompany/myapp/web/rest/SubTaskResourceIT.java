package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestApp;
import com.mycompany.myapp.domain.SubTask;
import com.mycompany.myapp.repository.SubTaskRepository;
import com.mycompany.myapp.service.SubTaskService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SubTaskResource} REST controller.
 */
@SpringBootTest(classes = TestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubTaskResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private SubTaskRepository subTaskRepository;

    @Autowired
    private SubTaskService subTaskService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubTaskMockMvc;

    private SubTask subTask;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubTask createEntity(EntityManager em) {
        SubTask subTask = new SubTask()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION);
        return subTask;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubTask createUpdatedEntity(EntityManager em) {
        SubTask subTask = new SubTask()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);
        return subTask;
    }

    @BeforeEach
    public void initTest() {
        subTask = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubTask() throws Exception {
        int databaseSizeBeforeCreate = subTaskRepository.findAll().size();
        // Create the SubTask
        restSubTaskMockMvc.perform(post("/api/sub-tasks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subTask)))
            .andExpect(status().isCreated());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeCreate + 1);
        SubTask testSubTask = subTaskList.get(subTaskList.size() - 1);
        assertThat(testSubTask.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testSubTask.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createSubTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subTaskRepository.findAll().size();

        // Create the SubTask with an existing ID
        subTask.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubTaskMockMvc.perform(post("/api/sub-tasks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subTask)))
            .andExpect(status().isBadRequest());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubTasks() throws Exception {
        // Initialize the database
        subTaskRepository.saveAndFlush(subTask);

        // Get all the subTaskList
        restSubTaskMockMvc.perform(get("/api/sub-tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subTask.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getSubTask() throws Exception {
        // Initialize the database
        subTaskRepository.saveAndFlush(subTask);

        // Get the subTask
        restSubTaskMockMvc.perform(get("/api/sub-tasks/{id}", subTask.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subTask.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingSubTask() throws Exception {
        // Get the subTask
        restSubTaskMockMvc.perform(get("/api/sub-tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubTask() throws Exception {
        // Initialize the database
        subTaskService.save(subTask);

        int databaseSizeBeforeUpdate = subTaskRepository.findAll().size();

        // Update the subTask
        SubTask updatedSubTask = subTaskRepository.findById(subTask.getId()).get();
        // Disconnect from session so that the updates on updatedSubTask are not directly saved in db
        em.detach(updatedSubTask);
        updatedSubTask
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);

        restSubTaskMockMvc.perform(put("/api/sub-tasks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubTask)))
            .andExpect(status().isOk());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeUpdate);
        SubTask testSubTask = subTaskList.get(subTaskList.size() - 1);
        assertThat(testSubTask.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testSubTask.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSubTask() throws Exception {
        int databaseSizeBeforeUpdate = subTaskRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubTaskMockMvc.perform(put("/api/sub-tasks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subTask)))
            .andExpect(status().isBadRequest());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubTask() throws Exception {
        // Initialize the database
        subTaskService.save(subTask);

        int databaseSizeBeforeDelete = subTaskRepository.findAll().size();

        // Delete the subTask
        restSubTaskMockMvc.perform(delete("/api/sub-tasks/{id}", subTask.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
